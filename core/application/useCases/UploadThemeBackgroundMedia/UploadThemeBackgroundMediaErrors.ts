import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UploadThemeBackgroundMediaErrors {
  export class ThemeNotFoundError extends Result<UseCaseError> {
    constructor(themeId: string) {
      super(false, {
        message: `Theme with id ${themeId} was not found`,
      } as UseCaseError);
    }
  }

  export class ThemeNotOwnedByUserError extends Result<UseCaseError> {
    constructor(themeId: string) {
      super(false, {
        message: `Theme with id ${themeId} does not belong to this user.`,
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

  export class MediaDeleteError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to delete existing media file.',
      } as UseCaseError);
    }
  }

  export class MediaUploadError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to upload the media file.',
      } as UseCaseError);
    }
  }
}
