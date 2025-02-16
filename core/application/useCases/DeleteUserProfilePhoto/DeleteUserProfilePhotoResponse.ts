import { Either, Result } from '@core/shared/core/Result';
import { DeleteUserProfilePhotoErrors } from '@core/application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoErrors';
import { AppError } from '@core/shared/core/AppError';

export type DeleteUserProfilePhotoResponse = Either<
  | DeleteUserProfilePhotoErrors.UserNotFoundError
  | DeleteUserProfilePhotoErrors.ProfilePhotoDeleteError
  | AppError.UnexpectedError,
  Result<void>
>;
