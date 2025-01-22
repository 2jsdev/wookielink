import { injectable, inject } from 'inversify';
import type { FileUploaderService } from '@/@core/application/services/FileUploaderService';
import type { IUserRepository } from '@/@core/domain/repositories/IUserRepository';
import { UserId } from '@/@core/domain/value-objects/UserId';
import { ValidationError } from '@/@core/domain/errors/ValidationError';

@injectable()
export class DeleteUserProfilePhotoUseCase {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository,
    @inject('FileUploaderService')
    private fileUploaderService: FileUploaderService
  ) {}

  async execute(userId: string): Promise<void> {
    const id = UserId.create(userId);

    const existingUser = await this.userRepository.findUserById(id.getValue());
    if (!existingUser) {
      throw new ValidationError('User not found.');
    }

    if (existingUser.props.image) {
      await this.fileUploaderService.delete(existingUser.props.image);
    }

    existingUser.deleteImage();

    await this.userRepository.updateUser(existingUser);

    return;
  }
}
