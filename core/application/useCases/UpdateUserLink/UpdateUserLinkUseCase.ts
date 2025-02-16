import { inject, injectable } from 'inversify';
import { UpdateUserLinkDTO } from '@core/application/useCases/UpdateUserLink/UpdateUserLinkDTO';
import { UpdateUserLinkResponse } from '@core/application/useCases/UpdateUserLink/UpdateUserLinkResponse';
import { UpdateUserLinkErrors } from '@core/application/useCases/UpdateUserLink/UpdateUserLinkErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';

@injectable()
export class UpdateUserLinkUseCase {
  constructor(
    @inject(TYPES.LinkRepository)
    private linkRepository: ILinkRepository
  ) {}

  async execute(request: UpdateUserLinkDTO): Promise<UpdateUserLinkResponse> {
    try {
      const { userId, link: updateData } = request;

      const existingLink = await this.linkRepository.findLinkById(
        updateData.id
      );
      if (!existingLink || existingLink.props.userId !== userId) {
        return left(new UpdateUserLinkErrors.LinkNotFoundError());
      }

      if (updateData.url !== undefined) {
        existingLink.updateUrl(updateData.url);
      }
      if (updateData.title !== undefined) {
        existingLink.updateTitle(updateData.title);
      }
      if (updateData.url !== undefined) {
        existingLink.updateUrl(updateData.url);
      }
      if (updateData.visible !== undefined) {
        updateData.visible
          ? existingLink.activate()
          : existingLink.deactivate();
      }
      if (updateData.archived !== undefined) {
        updateData.archived ? existingLink.archive() : existingLink.unarchive();
      }
      if (updateData.position !== undefined) {
        existingLink.updatePosition(updateData.position);
      }

      if (updateData.layout !== undefined) {
        existingLink.updateLayout(updateData.layout);
      }

      const updatedLink =
        await this.linkRepository.updateUserLink(existingLink);

      return right(Result.ok(updatedLink));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
