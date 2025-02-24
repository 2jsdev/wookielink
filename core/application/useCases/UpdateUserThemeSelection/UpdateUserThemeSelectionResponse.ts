import { Either, Result } from '@core/shared/core/Result';
import { User } from '@core/domain/entities/User';
import { AppError } from '@core/shared/core/AppError';
import { UpdateUserThemeSelectionErrors } from './UpdateUserThemeSelectionErrors';

export type UpdateUserThemeSelectionResponse = Either<
  | UpdateUserThemeSelectionErrors.UserNotFoundError
  | UpdateUserThemeSelectionErrors.ThemeNotFoundError
  | AppError.UnexpectedError,
  Result<User>
>;
