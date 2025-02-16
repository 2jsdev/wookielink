import { inject, injectable } from 'inversify';
import { DeleteUserLinkThumbnailDTO } from '@core/application/useCases/DeleteUserLinkThumbnail/DeleteUserLinkThumbnailDTO';
import { DeleteUserLinkThumbnailResponse } from '@core/application/useCases/DeleteUserLinkThumbnail/DeleteUserLinkThumbnailResponse';
import { DeleteUserLinkThumbnailErrors } from '@core/application/useCases/DeleteUserLinkThumbnail/DeleteUserLinkThumbnailErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { FileUploaderService } from '@core/application/services/FileUploaderService';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

@injectable()
export class DeleteUserLinkThumbnailUseCase {
  constructor(
    @inject(TYPES.LinkRepository) private linkRepository: ILinkRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: FileUploaderService
  ) {}

  async execute(
    request: DeleteUserLinkThumbnailDTO
  ): Promise<DeleteUserLinkThumbnailResponse> {
    try {
      const { userId, linkId } = request;
      const id = new UniqueEntityID(userId);

      const existingLink = await this.linkRepository.findLinkById(linkId);
      if (!existingLink) {
        return left(
          new DeleteUserLinkThumbnailErrors.LinkNotFoundError(id.toString())
        );
      }

      if (existingLink.userId !== userId) {
        return left(
          new DeleteUserLinkThumbnailErrors.LinkNotOwnedByUserError(linkId)
        );
      }

      const minioUrl = process.env.MINIO_SERVER_URL || '';

      if (
        existingLink.props.thumbnail &&
        existingLink.props.thumbnail.startsWith(minioUrl)
      ) {
        try {
          await this.fileUploaderService.delete(existingLink.props.thumbnail);
        } catch (error) {
          return left(new DeleteUserLinkThumbnailErrors.ThumbnailUploadError());
        }
      }

      existingLink.deleteThumbnail();

      await this.linkRepository.updateUserLink(existingLink);

      return right(Result.ok<void>());
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
