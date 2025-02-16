import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace GetPublicProfileErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      console.log('UserNotFoundError', userId);
      super(false, {
        message: `User with id ${userId} was not found`,
      } as UseCaseError);
    }
  }
}
