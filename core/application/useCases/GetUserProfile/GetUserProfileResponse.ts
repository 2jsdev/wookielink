import { Either, Result } from '@core/shared/core/Result';
import { GetUserProfileErrors } from '@core/application/useCases/GetUserProfile/GetUserProfileErrors';
import { AppError } from '@core/shared/core/AppError';
import { User } from '@core/domain/entities/User';

export type GetUserProfileResponse = Either<
  GetUserProfileErrors.UserNotFoundError | AppError.UnexpectedError,
  Result<User>
>;
