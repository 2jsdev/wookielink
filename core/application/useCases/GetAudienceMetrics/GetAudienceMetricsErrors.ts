import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace GetAudienceMetricsErrors {
  export class MetricsNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `No audience metrics found`,
      } as UseCaseError);
    }
  }
}
