import { inject, injectable } from 'inversify';
import { ReorderUserLinksDTO } from '@core/application/useCases/ReorderUserLinks/ReorderUserLinksDTO';
import { ReorderUserLinksResponse } from '@core/application/useCases/ReorderUserLinks/ReorderUserLinksResponse';
import { ReorderUserLinksErrors } from '@core/application/useCases/ReorderUserLinks/ReorderUserLinksErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

@injectable()
export class ReorderUserLinksUseCase {
  constructor(
    @inject(TYPES.LinkRepository)
    private linkRepository: ILinkRepository
  ) {}

  async execute(
    request: ReorderUserLinksDTO
  ): Promise<ReorderUserLinksResponse> {
    try {
      const { userId, links: newPositions } = request;

      if (!newPositions || newPositions.length === 0) {
        return left(new ReorderUserLinksErrors.LinksToReorderEmpty());
      }

      const existingLinks = await this.linkRepository.getUserLinks(userId);

      const existingLinksIds = new Set(
        existingLinks.map((link) => link.id.toValue())
      );

      for (const linkOrder of newPositions) {
        const linkId = new UniqueEntityID(linkOrder.id);
        if (!existingLinksIds.has(linkId.toValue())) {
          return left(new ReorderUserLinksErrors.LinkNotFound(linkOrder.id));
        }
      }

      for (const linkOrder of newPositions) {
        const linkToUpdate = existingLinks.find(
          (link) => link.id.toValue() === linkOrder.id
        );
        if (linkToUpdate) {
          linkToUpdate.updatePosition(linkOrder.position);
          await this.linkRepository.updateUserLink(linkToUpdate);
        }
      }

      return right(Result.ok<void>());
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
