import { Either, Result } from '@core/shared/core/Result';
import { AddUserLinkErrors } from '@core/application/useCases/AddUserLink/AddUserLinkErrors';
import { AppError } from '@core/shared/core/AppError';
import { Link } from '@core/domain/entities/Link';

export type AddUserLinkResponse = Either<
  AddUserLinkErrors.LinkAlreadyExistsError | AppError.UnexpectedError,
  Result<Link>
>;
