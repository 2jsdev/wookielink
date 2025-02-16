import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace DeleteUserProfilePhotoErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} was not found`,
      } as UseCaseError);
    }
  }

  export class ProfilePhotoDeleteError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Failed to delete profile photo`,
      } as UseCaseError);
    }
  }
}
