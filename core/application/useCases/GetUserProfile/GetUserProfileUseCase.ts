import { inject, injectable } from 'inversify';
import { GetUserProfileDTO } from '@core/application/useCases/GetUserProfile/GetUserProfileDTO';
import { GetUserProfileResponse } from '@core/application/useCases/GetUserProfile/GetUserProfileResponse';
import { GetUserProfileErrors } from '@core/application/useCases/GetUserProfile/GetUserProfileErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(request: GetUserProfileDTO): Promise<GetUserProfileResponse> {
    try {
      const user = await this.userRepository.findUserById(request.userId);

      if (!user) {
        return left(new GetUserProfileErrors.UserNotFoundError(request.userId));
      }

      return right(Result.ok(user));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
