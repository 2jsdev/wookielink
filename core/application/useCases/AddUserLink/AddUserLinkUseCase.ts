import { inject, injectable } from 'inversify';
import { AddUserLinkDTO } from '@core/application/useCases/AddUserLink/AddUserLinkDTO';
import { AddUserLinkResponse } from '@core/application/useCases/AddUserLink/AddUserLinkResponse';
import { AddUserLinkErrors } from '@core/application/useCases/AddUserLink/AddUserLinkErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { Link } from '@core/domain/entities/Link';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { LinkUrl } from '@core/domain/value-objects/LinkUrl';

@injectable()
export class AddUserLinkUseCase {
  constructor(
    @inject(TYPES.LinkRepository)
    private linkRepository: ILinkRepository
  ) {}

  async execute(request: AddUserLinkDTO): Promise<AddUserLinkResponse> {
    try {
      const { userId, link } = request;

      const maxPosition =
        await this.linkRepository.getMaxPositionByUser(userId);

      const linkOrError = Link.create(
        {
          title: link.title,
          url: link.url ? LinkUrl.create(link.url) : undefined,
          position: maxPosition ? maxPosition + 1 : 0,
          userId: userId,
        },
        new UniqueEntityID()
      );

      if (linkOrError.isFailure) {
        return left(new AddUserLinkErrors.InvalidLinkDataError());
      }

      const newLink = linkOrError.getValue();

      const savedLink = await this.linkRepository.createUserLink(newLink);

      return right(Result.ok(savedLink));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
