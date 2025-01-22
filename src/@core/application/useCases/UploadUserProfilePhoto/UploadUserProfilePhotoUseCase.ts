import { injectable, inject } from 'inversify';
import type { IUserRepository } from '@/@core/domain/repositories/IUserRepository';
import type { FileUploaderService } from '@/@core/application/services/FileUploaderService';
import { UploadUserProfilePhotoRequestDTO } from './UploadUserProfilePhotoRequestDTO';
import { UploadUserProfilePhotoResponse } from './UploadUserProfilePhotoResponse';
import { ValidationError } from '@/@core/domain/errors/ValidationError';

@injectable()
export class UploadUserProfilePhotoUseCase {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository,
    @inject('FileUploaderService')
    private fileUploaderService: FileUploaderService
  ) {}

  async execute(
    request: UploadUserProfilePhotoRequestDTO
  ): Promise<UploadUserProfilePhotoResponse> {
    const { userId, file } = request;

    // Retrieve user data
    const existingUser = await this.userRepository.findUserById(userId);
    if (!existingUser) {
      throw new ValidationError('User not found.');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      throw new ValidationError(
        'Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed.'
      );
    }

    // Check if the user already has a profile photo
    if (existingUser.props.image) {
      try {
        await this.fileUploaderService.delete(existingUser.props.image);
      } catch (error) {
        console.error('Failed to delete existing profile photo:', error);
        throw new ValidationError('Failed to delete existing profile photo.');
      }
    }

    // Upload new profile photo
    const uploadedFile = await this.fileUploaderService.upload(file);
    if (!uploadedFile) {
      throw new ValidationError('Failed to upload new profile photo.');
    }

    // Update user profile with new photo path
    existingUser.updateImage(
      `${process.env.MINIO_SERVER_URL}/${uploadedFile.path}`
    );
    await this.userRepository.updateUser(existingUser);

    return {
      uploadedFile: {
        filename: uploadedFile.filename,
        path: uploadedFile.path,
      },
    };
  }
}
