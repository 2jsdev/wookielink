import { Either, Result } from '@core/shared/core/Result';
import { UpdateUserProfileErrors } from '@core/application/useCases/UpdateUserProfile/UpdateUserProfileErrors';
import { AppError } from '@core/shared/core/AppError';
import { User } from '@core/domain/entities/User';

export type UpdateUserProfileResponse = Either<
  | UpdateUserProfileErrors.UserNotFoundError
  | UpdateUserProfileErrors.InvalidUsername
  | AppError.UnexpectedError,
  Result<User>
>;
