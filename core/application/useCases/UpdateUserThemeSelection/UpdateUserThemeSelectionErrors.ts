import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UpdateUserThemeSelectionErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} not found`,
      } as UseCaseError);
    }
  }

  export class ThemeNotFoundError extends Result<UseCaseError> {
    constructor(themeId: string) {
      super(false, {
        message: `Theme with id ${themeId} not found`,
      } as UseCaseError);
    }
  }
}
