import { inject, injectable } from 'inversify';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { IFileUploaderService } from '@core/application/services/IFileUploaderService';
import { UpdateUserImagePreviewWithColorDTO } from './UpdateUserImagePreviewWithColorDTO';
import { UpdateUserImagePreviewWithColorErrors } from './UpdateUserImagePreviewWithColorErrors';
import { UpdateUserImagePreviewWithColorResponse } from './UpdateUserImagePreviewWithColorResponse';
import { left, right, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { randomUUID } from 'crypto';
import { generateImagePreviewBuffer } from '@core/application/utils/generateImagePreviewBuffer';

@injectable()
export class UpdateUserImagePreviewWithColorUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: IFileUploaderService
  ) {}

  async execute(
    dto: UpdateUserImagePreviewWithColorDTO
  ): Promise<UpdateUserImagePreviewWithColorResponse> {
    try {
      const { userId, imagePreviewBgColor } = dto;

      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return left(
          new UpdateUserImagePreviewWithColorErrors.UserNotFoundError(userId)
        );
      }

      const buffer = await generateImagePreviewBuffer(
        user.username ?? '',
        user.image ?? '',
        imagePreviewBgColor
      );

      if (!buffer) {
        return left(
          new UpdateUserImagePreviewWithColorErrors.ImageGenerationError()
        );
      }

      const arrayBuffer = new ArrayBuffer(buffer.byteLength);
      const view = new Uint8Array(arrayBuffer);
      view.set(buffer);

      const minioUrl = process.env.MINIO_SERVER_URL || '';

      // 🔥 Eliminar imagen previa si es de MinIO
      if (
        user.props.imagePreview &&
        user.props.imagePreview.startsWith(minioUrl)
      ) {
        try {
          await this.fileUploaderService.delete(user.props.imagePreview);
        } catch (error) {
          console.error('Failed to delete existing image preview', error);
          return left(
            new UpdateUserImagePreviewWithColorErrors.ImageDeleteError()
          );
        }
      }

      // ✅ Subir nueva imagen
      const uniqueSuffix = Date.now() + '-' + randomUUID();
      const fileName = `preview-${userId}-${uniqueSuffix}.png`;

      // Subir nueva imagen
      const uploaded = await this.fileUploaderService.upload(
        {
          name: fileName,
          size: arrayBuffer.byteLength,
          type: 'image/png',
          extension: 'png',
          content: arrayBuffer,
        },
        `users/${userId}/profile`
      );

      if (!uploaded) {
        return left(
          new UpdateUserImagePreviewWithColorErrors.ImageUploadError()
        );
      }

      const imageUrl = `${minioUrl}/${uploaded.path}`;

      user.updateImagePreview(imageUrl);
      user.updateImagePreviewBgColor(imagePreviewBgColor);

      await this.userRepository.updateUser(user);

      return right(Result.ok(user));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
