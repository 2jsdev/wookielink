import { Either, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { DeleteUserLinkErrors } from './DeleteUserLinkErrors';

export type DeleteUserLinkResponse = Either<
  | DeleteUserLinkErrors.LinkNotFoundError
  | DeleteUserLinkErrors.UnauthorizedError
  | AppError.UnexpectedError,
  Result<void>
>;
