import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace AddUserLinkErrors {
  export class LinkAlreadyExistsError extends Result<UseCaseError> {
    constructor(url: string) {
      super(false, {
        message: `Link with url ${url} already exists`,
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
