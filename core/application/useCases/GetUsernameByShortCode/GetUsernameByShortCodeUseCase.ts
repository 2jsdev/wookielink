import { inject, injectable } from 'inversify';
import { GetUsernameByShortCodeDTO } from '@core/application/useCases/GetUsernameByShortCode/GetUsernameByShortCodeDTO';
import { GetUsernameByShortCodeResponse } from '@core/application/useCases/GetUsernameByShortCode/GetUsernameByShortCodeResponse';
import { GetUsernameByShortCodeErrors } from '@core/application/useCases/GetUsernameByShortCode/GetUsernameByShortCodeErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';

@injectable()
export class GetUsernameByShortCodeUseCase {
  constructor(
    @inject(TYPES.LinkRepository) private linkRepository: ILinkRepository
  ) {}

  async execute(
    request: GetUsernameByShortCodeDTO
  ): Promise<GetUsernameByShortCodeResponse> {
    try {
      const { shortCode } = request;
      const username = await this.linkRepository.findByShortCode(shortCode);

      if (!username) {
        return left(
          new GetUsernameByShortCodeErrors.LinkNotFoundError(shortCode)
        );
      }

      return right(Result.ok(username));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
