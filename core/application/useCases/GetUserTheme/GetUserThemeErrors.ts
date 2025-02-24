import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace GetUserThemeErrors {
  export class InvalidThemeDataError extends Result<UseCaseError> {
    constructor(message?: string) {
      super(false, {
        message: message || `Invalid theme data`,
      } as UseCaseError);
    }
  }
}
