import { Either, Result } from '@core/shared/core/Result';
import { UploadUserLinkThumbnailErrors } from '@core/application/useCases/UploadUserLinkThumbnail/UploadUserLinkThumbnailErrors';
import { AppError } from '@core/shared/core/AppError';
import { Link } from '@core/domain/entities/Link';

export type UploadUserLinkThumbnailResponse = Either<
  | UploadUserLinkThumbnailErrors.LinkNotOwnedByUserError
  | UploadUserLinkThumbnailErrors.LinkNotFoundError
  | UploadUserLinkThumbnailErrors.InvalidFileTypeError
  | UploadUserLinkThumbnailErrors.ThumbnailUploadError
  | UploadUserLinkThumbnailErrors.ThumbnailDeleteError
  | AppError.UnexpectedError,
  Result<Link>
>;
