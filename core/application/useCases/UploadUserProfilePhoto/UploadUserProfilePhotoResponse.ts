import { Either, Result } from '@core/shared/core/Result';
import { UploadUserProfilePhotoErrors } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoErrors';
import { AppError } from '@core/shared/core/AppError';
import { User } from '@core/domain/entities/User';

export type UploadUserProfilePhotoResponse = Either<
  | UploadUserProfilePhotoErrors.UserNotFoundError
  | UploadUserProfilePhotoErrors.InvalidFileTypeError
  | UploadUserProfilePhotoErrors.ProfilePhotoUploadError
  | UploadUserProfilePhotoErrors.ProfilePhotoDeleteError
  | AppError.UnexpectedError,
  Result<User>
>;
