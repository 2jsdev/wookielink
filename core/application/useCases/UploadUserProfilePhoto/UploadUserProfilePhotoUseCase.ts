import { inject, injectable } from 'inversify';
import { UploadUserProfilePhotoDTO } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoDTO';
import { UploadUserProfilePhotoResponse } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoResponse';
import { UploadUserProfilePhotoErrors } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { FileUploaderService } from '@core/application/services/FileUploaderService';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { User } from '@core/domain/entities/User';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

@injectable()
export class UploadUserProfilePhotoUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: FileUploaderService
  ) {}

  async execute(
    request: UploadUserProfilePhotoDTO
  ): Promise<UploadUserProfilePhotoResponse> {
    try {
      const { userId, photo } = request;
      const id = new UniqueEntityID(userId);

      const existingUser = await this.userRepository.findUserById(userId);
      if (!existingUser) {
        return left(
          new UploadUserProfilePhotoErrors.UserNotFoundError(id.toString())
        );
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      if (!allowedTypes.includes(photo.type)) {
        return left(new UploadUserProfilePhotoErrors.InvalidFileTypeError());
      }

      const minioUrl = process.env.MINIO_SERVER_URL || '';

      if (
        existingUser.props.image &&
        existingUser.props.image.startsWith(minioUrl)
      ) {
        try {
          await this.fileUploaderService.delete(existingUser.props.image);
        } catch (error) {
          console.error('Failed to delete existing profile photo:', error);
          return left(
            new UploadUserProfilePhotoErrors.ProfilePhotoDeleteError()
          );
        }
      }

      const uploadedFile = await this.fileUploaderService.upload(
        photo,
        `users/${userId}/profile`
      );
      if (!uploadedFile) {
        return left(new UploadUserProfilePhotoErrors.ProfilePhotoUploadError());
      }

      const newImageUrl = `${minioUrl}/${uploadedFile.path}`;
      existingUser.updateImage(newImageUrl);

      await this.userRepository.updateUser(existingUser);

      return right(Result.ok<User>(existingUser));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
