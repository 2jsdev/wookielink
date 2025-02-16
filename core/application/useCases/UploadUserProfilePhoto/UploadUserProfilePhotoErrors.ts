import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UploadUserProfilePhotoErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} was not found`,
      } as UseCaseError);
    }
  }

  export class InvalidFileTypeError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Invalid file type. Only image files are allowed',
      } as UseCaseError);
    }
  }

  export class ProfilePhotoUploadError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to upload new profile photo',
      } as UseCaseError);
    }
  }

  export class ProfilePhotoDeleteError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to delete existing profile photo',
      } as UseCaseError);
    }
  }
}
