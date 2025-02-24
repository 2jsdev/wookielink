import { injectable, inject } from 'inversify';
import { UpdateThemeDTO } from '@core/application/useCases/UpdateTheme/UpdateThemeDTO';
import { UpdateThemeResponse } from '@core/application/useCases/UpdateTheme/UpdateThemeResponse';
import { IThemeRepository } from '@core/domain/repositories/IThemeRepository';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, right, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { UpdateThemeErrors } from './UpdateThemeErrors';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { FontStyle } from '@core/domain/entities/FontStyle';
import { ButtonStyle } from '@core/domain/entities/ButtonStyle';
import { Background } from '@core/domain/entities/Background';

@injectable()
export class UpdateThemeUseCase {
  constructor(
    @inject(TYPES.ThemeRepository)
    private themeRepository: IThemeRepository
  ) {}

  async execute(request: UpdateThemeDTO): Promise<UpdateThemeResponse> {
    try {
      const { userId, theme: updateData } = request;

      const existingTheme = await this.themeRepository.findThemeById(
        updateData.id
      );

      if (!existingTheme) {
        return left(new UpdateThemeErrors.ThemeNotFoundError());
      }

      if (existingTheme.props.ownerId !== userId) {
        return left(new UpdateThemeErrors.UnauthorizedError());
      }

      if (updateData.name !== undefined) {
        existingTheme.updateName(updateData.name);
      }
      if (updateData.premium !== undefined) {
        existingTheme.updatePremium(updateData.premium);
      }
      if (updateData.background !== undefined) {
        existingTheme.updateBackground(
          Background.create(
            updateData.background,
            new UniqueEntityID(updateData.background.id)
          )
        );
      }
      if (updateData.buttonStyle !== undefined) {
        existingTheme.updateButtonStyle(
          ButtonStyle.create(
            updateData.buttonStyle,
            new UniqueEntityID(updateData.buttonStyle.id)
          )
        );
      }
      if (updateData.fontStyle !== undefined) {
        existingTheme.updateFontStyle(
          FontStyle.create(
            updateData.fontStyle,
            new UniqueEntityID(updateData.fontStyle.id)
          )
        );
      }

      const updatedTheme =
        await this.themeRepository.updateTheme(existingTheme);

      return right(Result.ok(updatedTheme));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
