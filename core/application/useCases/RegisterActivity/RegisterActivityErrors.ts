import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace RegisterActivityErrors {
  export class DuplicateActivityError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Activity already registered in the last timeframe.`,
      } as UseCaseError);
    }
  }

  export class InvalidActivityDataError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Invalid activity data.`,
      } as UseCaseError);
    }
  }
}
