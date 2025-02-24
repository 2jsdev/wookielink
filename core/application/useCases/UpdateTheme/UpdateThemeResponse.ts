import { Either, Result } from '@core/shared/core/Result';
import { Theme } from '@core/domain/entities/Theme';
import { AppError } from '@core/shared/core/AppError';
import { UpdateThemeErrors } from './UpdateThemeErrors';

export type UpdateThemeResponse = Either<
  | UpdateThemeErrors.ThemeNotFoundError
  | UpdateThemeErrors.UnauthorizedError
  | AppError.UnexpectedError,
  Result<Theme>
>;
