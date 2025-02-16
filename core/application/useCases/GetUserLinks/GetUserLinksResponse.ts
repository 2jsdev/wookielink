import { Either, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { GetUserLinksErrors } from '@core/application/useCases/GetUserLinks/GetUserLinksErrors';
import { Link } from '@core/domain/entities/Link';

export type GetUserLinksResponse = Either<
  GetUserLinksErrors.UserWithoutLinksError | AppError.UnexpectedError,
  Result<Link[]>
>;
