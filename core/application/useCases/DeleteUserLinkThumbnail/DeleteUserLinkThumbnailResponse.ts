import { Either, Result } from '@core/shared/core/Result';
import { DeleteUserLinkThumbnailErrors } from '@core/application/useCases/DeleteUserLinkThumbnail/DeleteUserLinkThumbnailErrors';
import { AppError } from '@core/shared/core/AppError';

export type DeleteUserLinkThumbnailResponse = Either<
  | DeleteUserLinkThumbnailErrors.LinkNotOwnedByUserError
  | DeleteUserLinkThumbnailErrors.LinkNotFoundError
  | DeleteUserLinkThumbnailErrors.ThumbnailUploadError
  | AppError.UnexpectedError,
  Result<void>
>;
