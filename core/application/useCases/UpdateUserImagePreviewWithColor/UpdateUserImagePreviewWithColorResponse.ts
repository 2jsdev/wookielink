import { AppError } from '@core/shared/core/AppError';
import { Either, Result } from '@core/shared/core/Result';
import { User } from '@core/domain/entities/User';
import { UpdateUserImagePreviewWithColorErrors } from './UpdateUserImagePreviewWithColorErrors';

export type UpdateUserImagePreviewWithColorResponse = Either<
  | UpdateUserImagePreviewWithColorErrors.UserNotFoundError
  | UpdateUserImagePreviewWithColorErrors.ImageGenerationError
  | UpdateUserImagePreviewWithColorErrors.ImageUploadError
  | UpdateUserImagePreviewWithColorErrors.ImageDeleteError
  | AppError.UnexpectedError,
  Result<User>
>;
