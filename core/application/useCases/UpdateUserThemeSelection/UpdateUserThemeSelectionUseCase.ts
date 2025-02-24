import { injectable, inject } from 'inversify';
import { UpdateUserThemeSelectionDTO } from '@core/application/useCases/UpdateUserThemeSelection/UpdateUserThemeSelectionDTO';
import { UpdateUserThemeSelectionResponse } from '@core/application/useCases/UpdateUserThemeSelection/UpdateUserThemeSelectionResponse';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { IThemeRepository } from '@core/domain/repositories/IThemeRepository';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, right, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { UpdateUserThemeSelectionErrors } from './UpdateUserThemeSelectionErrors';
import { User } from '@core/domain/entities/User';

@injectable()
export class UpdateUserThemeSelectionUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository,
    @inject(TYPES.ThemeRepository)
    private themeRepository: IThemeRepository
  ) {}

  async execute(
    request: UpdateUserThemeSelectionDTO
  ): Promise<UpdateUserThemeSelectionResponse> {
    try {
      const { userId, themeId } = request;

      // Buscar el usuario
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return left(
          new UpdateUserThemeSelectionErrors.UserNotFoundError(userId)
        );
      }

      // Si se pasa un themeId (es decir, se selecciona un tema global) se verifica que exista
      if (themeId) {
        const theme = await this.themeRepository.findThemeById(themeId);
        if (!theme) {
          return left(
            new UpdateUserThemeSelectionErrors.ThemeNotFoundError(themeId)
          );
        }
      }

      // Actualizar la selección de theme en el usuario
      // En este caso, se actualiza el campo themeId.
      // Si themeId es null, se eliminará la selección personalizada.
      user.updateThemeId(themeId);

      // Persistir el usuario actualizado
      const updatedUser: User = await this.userRepository.updateUser(user);

      return right(Result.ok(updatedUser));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
