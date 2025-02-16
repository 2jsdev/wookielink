import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace DeleteUserLinkErrors {
  export class UnauthorizedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `You are not authorized to delete this link`,
      } as UseCaseError);
    }
  }

  export class LinkNotFoundError extends Result<UseCaseError> {
    constructor(linkId: string) {
      super(false, {
        message: `Link with id ${linkId} was not found`,
      } as UseCaseError);
    }
  }

  export class ThumbnailDeleteError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to delete existing thumbnail',
      } as UseCaseError);
    }
  }
}
