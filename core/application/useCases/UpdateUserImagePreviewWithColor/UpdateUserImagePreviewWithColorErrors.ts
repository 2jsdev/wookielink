import { Result } from '@core/shared/core/Result';
import { UseCaseError } from '@core/shared/core/UseCaseError';

export namespace UpdateUserImagePreviewWithColorErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `User with id ${userId} was not found`,
      } as UseCaseError);
    }
  }

  export class ImageGenerationError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to generate image preview',
      } as UseCaseError);
    }
  }

  export class ImageUploadError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Failed to upload generated image',
      } as UseCaseError);
    }
  }

  export class ImageDeleteError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `There was an error deleting the existing image preview.`,
      } as UseCaseError);
    }
  }
}
