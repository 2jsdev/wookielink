import { Either, Result } from '@core/shared/core/Result';
import { UploadThemeBackgroundMediaErrors } from '@core/application/useCases/UploadThemeBackgroundMedia/UploadThemeBackgroundMediaErrors';
import { AppError } from '@core/shared/core/AppError';
import { Theme } from '@core/domain/entities/Theme';

export type UploadThemeBackgroundMediaResponse = Either<
  | UploadThemeBackgroundMediaErrors.ThemeNotFoundError
  | UploadThemeBackgroundMediaErrors.ThemeNotOwnedByUserError
  | UploadThemeBackgroundMediaErrors.InvalidFileTypeError
  | UploadThemeBackgroundMediaErrors.MediaDeleteError
  | UploadThemeBackgroundMediaErrors.MediaUploadError
  | AppError.UnexpectedError,
  Result<Theme>
>;
