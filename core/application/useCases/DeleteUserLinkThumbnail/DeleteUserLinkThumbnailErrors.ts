import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace DeleteUserLinkThumbnailErrors {
  export class LinkNotOwnedByUserError extends Result<UseCaseError> {
    constructor(linkId: string) {
      super(false, {
        message: `Link with id ${linkId} is not owned by the user`,
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

  export class ThumbnailUploadError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to upload the thumbnail',
      } as UseCaseError);
    }
  }
}
