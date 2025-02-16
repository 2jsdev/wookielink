import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace ReorderUserLinksErrors {
  export class LinksToReorderEmpty extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Links to reorder must be provided`,
      } as UseCaseError);
    }
  }

  export class LinkNotFound extends Result<UseCaseError> {
    constructor(linkId: string) {
      super(false, {
        message: `Link with ID ${linkId} does not exist or does not belong to the user.`,
      } as UseCaseError);
    }
  }
}
