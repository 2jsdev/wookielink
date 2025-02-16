import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UpdateUserLinkErrors {
  export class LinkNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Link not found`,
      } as UseCaseError);
    }
  }

  export class InvalidLinkDataError extends Result<UseCaseError> {
    constructor(message?: string) {
      super(false, {
        message: message || `Invalid link data`,
      } as UseCaseError);
    }
  }
}
