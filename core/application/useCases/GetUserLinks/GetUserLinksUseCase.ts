import { inject, injectable } from 'inversify';
import { GetUserLinksDTO } from '@core/application/useCases/GetUserLinks/GetUserLinksDTO';
import { GetUserLinksResponse } from '@core/application/useCases/GetUserLinks/GetUserLinksResponse';
import { GetUserLinksErrors } from '@core/application/useCases/GetUserLinks/GetUserLinksErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';

@injectable()
export class GetUserLinksUseCase {
  constructor(
    @inject(TYPES.LinkRepository) private linkRepository: ILinkRepository
  ) {}

  async execute(request: GetUserLinksDTO): Promise<GetUserLinksResponse> {
    try {
      const links = await this.linkRepository.getUserLinks(request.userId);

      if (!links || links.length === 0) {
        return left(
          new GetUserLinksErrors.UserWithoutLinksError(request.userId)
        );
      }
      return right(Result.ok(links));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
