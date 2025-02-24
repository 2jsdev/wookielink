import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace CreateDefaultThemeErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} was not found`,
      } as UseCaseError);
    }
  }

  export class InvalidThemeDataError extends Result<UseCaseError> {
    constructor(message?: string) {
      super(false, {
        message: message || `Invalid theme data`,
      } as UseCaseError);
    }
  }
}
