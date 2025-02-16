import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UpdateUserProfileErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} was not found`,
      } as UseCaseError);
    }
  }

  export class InvalidUsername extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username is required`,
      } as UseCaseError);
    }
  }
}
