import { inject, injectable } from 'inversify';
import { UploadUserLinkThumbnailDTO } from '@core/application/useCases/UploadUserLinkThumbnail/UploadUserLinkThumbnailDTO';
import { UploadUserLinkThumbnailResponse } from '@core/application/useCases/UploadUserLinkThumbnail/UploadUserLinkThumbnailResponse';
import { UploadUserLinkThumbnailErrors } from '@core/application/useCases/UploadUserLinkThumbnail/UploadUserLinkThumbnailErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { IFileUploaderService } from '@core/application/services/IFileUploaderService';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { Link } from '@core/domain/entities/Link';

@injectable()
export class UploadUserLinkThumbnailUseCase {
  constructor(
    @inject(TYPES.LinkRepository) private linkRepository: ILinkRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: IFileUploaderService
  ) {}

  async execute(
    request: UploadUserLinkThumbnailDTO
  ): Promise<UploadUserLinkThumbnailResponse> {
    try {
      const { userId, linkId, thumbnail } = request;
      const existingLink = await this.linkRepository.findLinkById(linkId);
      if (!existingLink) {
        return left(
          new UploadUserLinkThumbnailErrors.LinkNotFoundError(linkId)
        );
      }

      if (existingLink.userId !== userId) {
        return left(
          new UploadUserLinkThumbnailErrors.LinkNotOwnedByUserError(linkId)
        );
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      if (!allowedTypes.includes(thumbnail.type)) {
        return left(new UploadUserLinkThumbnailErrors.InvalidFileTypeError());
      }

      const minioUrl = process.env.MINIO_SERVER_URL || '';

      if (
        existingLink.props.thumbnail &&
        existingLink.props.thumbnail.startsWith(minioUrl)
      ) {
        try {
          await this.fileUploaderService.delete(existingLink.props.thumbnail);
        } catch (error) {
          console.error('Failed to delete existing profile photo:', error);
          return left(new UploadUserLinkThumbnailErrors.ThumbnailDeleteError());
        }
      }

      const uploadedFile = await this.fileUploaderService.upload(
        thumbnail,
        `users/${userId}/links`
      );
      if (!uploadedFile) {
        return left(new UploadUserLinkThumbnailErrors.ThumbnailUploadError());
      }

      const newImageUrl = `${minioUrl}/${uploadedFile.path}`;
      existingLink.updateThumbnail(newImageUrl);

      await this.linkRepository.updateUserLink(existingLink);

      return right(Result.ok<Link>(existingLink));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
