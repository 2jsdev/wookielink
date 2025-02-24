import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UpdateThemeErrors {
  export class ThemeNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Theme not found`,
      } as UseCaseError);
    }
  }

  export class UnauthorizedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Unauthorized operation`,
      } as UseCaseError);
    }
  }
}
