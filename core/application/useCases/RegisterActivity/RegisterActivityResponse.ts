import { Either, Result } from '@core/shared/core/Result';
import { RegisterActivityErrors } from '@core/application/useCases/RegisterActivity/RegisterActivityErrors';
import { AppError } from '@core/shared/core/AppError';
import { Activity } from '@core/domain/entities/Activity';

export type RegisterActivityResponse = Either<
  RegisterActivityErrors.InvalidActivityDataError | AppError.UnexpectedError,
  Result<Activity>
>;
