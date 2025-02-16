import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UploadUserLinkThumbnailErrors {
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

  export class InvalidFileTypeError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Invalid file type. Only image files are allowed',
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

  export class ThumbnailDeleteError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to delete existing thumbnail',
      } as UseCaseError);
    }
  }
}
