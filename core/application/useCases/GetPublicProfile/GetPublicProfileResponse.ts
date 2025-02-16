import { Either, Result } from '@core/shared/core/Result';
import { GetPublicProfileErrors } from '@core/application/useCases/GetPublicProfile/GetPublicProfileErrors';
import { AppError } from '@core/shared/core/AppError';
import { User } from '@core/domain/entities/User';

export type GetPublicProfileResponse = Either<
  GetPublicProfileErrors.UserNotFoundError | AppError.UnexpectedError,
  Result<User>
>;
