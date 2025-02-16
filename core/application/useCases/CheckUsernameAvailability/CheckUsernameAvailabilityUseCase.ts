import { inject, injectable } from 'inversify';
import { CheckUsernameAvailabilityDTO } from '@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityDTO';
import { CheckUsernameAvailabilityResponse } from '@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityResponse';
import { CheckUsernameAvailabilityErrors } from '@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';

@injectable()
export class CheckUsernameAvailabilityUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(
    request: CheckUsernameAvailabilityDTO
  ): Promise<CheckUsernameAvailabilityResponse> {
    try {
      const user = await this.userRepository.findUserByUsername(
        request.username
      );

      if (user) {
        return left(
          new CheckUsernameAvailabilityErrors.UsernameTakenError(
            request.username
          )
        );
      }

      return right(Result.ok(true));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
