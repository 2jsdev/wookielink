import { inject, injectable } from 'inversify';
import { DeleteUserProfilePhotoDTO } from '@core/application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoDTO';
import { DeleteUserProfilePhotoResponse } from '@core/application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoResponse';
import { DeleteUserProfilePhotoErrors } from '@core/application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { FileUploaderService } from '@core/application/services/FileUploaderService';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

@injectable()
export class DeleteUserProfilePhotoUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: FileUploaderService
  ) {}

  async execute(
    request: DeleteUserProfilePhotoDTO
  ): Promise<DeleteUserProfilePhotoResponse> {
    try {
      const { userId } = request;
      const id = new UniqueEntityID(userId);

      const existingUser = await this.userRepository.findUserById(userId);
      if (!existingUser) {
        return left(
          new DeleteUserProfilePhotoErrors.UserNotFoundError(id.toString())
        );
      }

      const minioUrl = process.env.MINIO_SERVER_URL || '';

      if (
        existingUser.props.image &&
        existingUser.props.image.startsWith(minioUrl)
      ) {
        try {
          await this.fileUploaderService.delete(existingUser.props.image);
        } catch (error) {
          return left(
            new DeleteUserProfilePhotoErrors.ProfilePhotoDeleteError()
          );
        }
      }

      existingUser.deleteImage();

      await this.userRepository.updateUser(existingUser);

      return right(Result.ok<void>());
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
