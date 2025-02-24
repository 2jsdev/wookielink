import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace GetUsernameByShortCodeErrors {
  export class LinkNotFoundError extends Result<UseCaseError> {
    constructor(shortCode: string) {
      super(false, {
        message: `Link with code ${shortCode} was not found`,
      } as UseCaseError);
    }
  }
}
