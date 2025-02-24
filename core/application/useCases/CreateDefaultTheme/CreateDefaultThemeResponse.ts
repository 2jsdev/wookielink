import { Either, Result } from '@core/shared/core/Result';
import { Theme } from '@core/domain/entities/Theme';
import { AppError } from '@core/shared/core/AppError';
import { CreateDefaultThemeErrors } from './CreateDefaultThemeErrors';

export type CreateDefaultThemeResponse = Either<
  | CreateDefaultThemeErrors.UserNotFoundError
  | CreateDefaultThemeErrors.InvalidThemeDataError
  | AppError.UnexpectedError,
  Result<Theme>
>;
