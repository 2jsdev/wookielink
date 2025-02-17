import { inject, injectable } from 'inversify';
import { DeleteUserLinkDTO } from '@core/application/useCases/DeleteUserLink/DeleteUserLinkDTO';
import { DeleteUserLinkResponse } from '@core/application/useCases/DeleteUserLink/DeleteUserLinkResponse';
import { DeleteUserLinkErrors } from '@core/application/useCases/DeleteUserLink/DeleteUserLinkErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { IFileUploaderService } from '@core/application/services/IFileUploaderService';

@injectable()
export class DeleteUserLinkUseCase {
  constructor(
    @inject(TYPES.LinkRepository)
    private linkRepository: ILinkRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: IFileUploaderService
  ) {}

  async execute(request: DeleteUserLinkDTO): Promise<DeleteUserLinkResponse> {
    try {
      const { userId, linkId } = request;

      const link = await this.linkRepository.findLinkById(linkId);

      if (!link) {
        return left(new DeleteUserLinkErrors.LinkNotFoundError(linkId));
      }

      if (link.userId !== userId) {
        return left(new DeleteUserLinkErrors.UnauthorizedError());
      }

      if (link.props.thumbnail) {
        try {
          await this.fileUploaderService.delete(link.props.thumbnail);
        } catch (error) {
          console.error('Failed to delete existing link thumbnail:', error);
          return left(new DeleteUserLinkErrors.ThumbnailDeleteError());
        }
      }
      await this.linkRepository.deleteUserLink(linkId);

      return right(Result.ok());
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
