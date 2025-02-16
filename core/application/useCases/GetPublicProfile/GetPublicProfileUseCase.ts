import { inject, injectable } from 'inversify';
import { GetPublicProfileDTO } from '@core/application/useCases/GetPublicProfile/GetPublicProfileDTO';
import { GetPublicProfileResponse } from '@core/application/useCases/GetPublicProfile/GetPublicProfileResponse';
import { GetPublicProfileErrors } from '@core/application/useCases/GetPublicProfile/GetPublicProfileErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { OpenGraphService } from '@core/application/services/OpenGraphService';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';

@injectable()
export class GetPublicProfileUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.OpenGraphService) private openGraphService: OpenGraphService
  ) {}

  async execute(
    request: GetPublicProfileDTO
  ): Promise<GetPublicProfileResponse> {
    try {
      const { username } = request;
      const user = await this.userRepository.findUserByUsername(username);

      if (!user) {
        return left(new GetPublicProfileErrors.UserNotFoundError(username));
      }

      if (user.links && user.links.length > 0) {
        await Promise.all(
          user.links.map(async (link) => {
            if (link.url?.value) {
              try {
                const ogData = await this.openGraphService.scrape(
                  link.url.value
                );
                console.log('ogData', ogData);
                if (ogData) {
                  link.updateOpenGraph(ogData);
                }
              } catch (error) {
                console.error(`Error scraping ${link.url.value}:`, error);
              }
            }
          })
        );
      }

      return right(Result.ok(user));
    } catch (error) {
      console.log('GetPublicProfileUseCase error', error);
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
