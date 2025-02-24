import { Either, Result } from '@core/shared/core/Result';
import { Theme } from '@core/domain/entities/Theme';
import { AppError } from '@core/shared/core/AppError';
import { GetUserThemeErrors } from './GetUserThemeErrors';

export type GetUserThemeResponse = Either<
  GetUserThemeErrors.InvalidThemeDataError | AppError.UnexpectedError,
  Result<Theme>
>;
