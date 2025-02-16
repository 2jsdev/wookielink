import { Either, Result } from '@core/shared/core/Result';
import { ReorderUserLinksErrors } from '@core/application/useCases/ReorderUserLinks/ReorderUserLinksErrors';
import { AppError } from '@core/shared/core/AppError';

export type ReorderUserLinksResponse = Either<
  | ReorderUserLinksErrors.LinksToReorderEmpty
  | ReorderUserLinksErrors.LinkNotFound
  | AppError.UnexpectedError,
  Result<void>
>;
