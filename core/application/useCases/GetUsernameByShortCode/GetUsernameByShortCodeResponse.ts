import { Either, Result } from '@core/shared/core/Result';
import { GetUsernameByShortCodeErrors } from '@core/application/useCases/GetUsernameByShortCode/GetUsernameByShortCodeErrors';
import { AppError } from '@core/shared/core/AppError';

export type GetUsernameByShortCodeResponse = Either<
  GetUsernameByShortCodeErrors.LinkNotFoundError | AppError.UnexpectedError,
  Result<string>
>;
