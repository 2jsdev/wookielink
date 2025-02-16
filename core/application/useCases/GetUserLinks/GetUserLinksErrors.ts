import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace GetUserLinksErrors {
  export class UserWithoutLinksError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} has no links`,
      } as UseCaseError);
    }
  }
}
