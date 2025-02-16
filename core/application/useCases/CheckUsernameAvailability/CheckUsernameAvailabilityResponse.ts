import { Either, Result } from '@core/shared/core/Result';
import { CheckUsernameAvailabilityErrors } from '@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityErrors';
import { AppError } from '@core/shared/core/AppError';

export type CheckUsernameAvailabilityResponse = Either<
  CheckUsernameAvailabilityErrors.UsernameTakenError | AppError.UnexpectedError,
  Result<boolean>
>;
