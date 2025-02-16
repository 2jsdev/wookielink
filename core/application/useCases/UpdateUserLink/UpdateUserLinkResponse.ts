import { Either, Result } from '@core/shared/core/Result';
import { UpdateUserLinkErrors } from '@core/application/useCases/UpdateUserLink/UpdateUserLinkErrors';
import { AppError } from '@core/shared/core/AppError';
import { Link } from '@core/domain/entities/Link';

export type UpdateUserLinkResponse = Either<
  | UpdateUserLinkErrors.LinkNotFoundError
  | UpdateUserLinkErrors.InvalidLinkDataError
  | AppError.UnexpectedError,
  Result<Link>
>;
