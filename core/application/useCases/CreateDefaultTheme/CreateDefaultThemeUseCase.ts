import { injectable, inject } from 'inversify';
import { CreateDefaultThemeDTO } from '@core/application/useCases/CreateDefaultTheme/CreateDefaultThemeDTO';
import { CreateDefaultThemeResponse } from '@core/application/useCases/CreateDefaultTheme/CreateDefaultThemeResponse';
import { IThemeRepository } from '@core/domain/repositories/IThemeRepository';
import { Theme } from '@core/domain/entities/Theme';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { left, Result, right } from '@core/shared/core/Result';
import { TYPES } from '@core/infrastructure/constants/types';
import { AppError } from '@core/shared/core/AppError';
import { Background } from '@core/domain/entities/Background';
import { ButtonStyle } from '@core/domain/entities/ButtonStyle';
import { FontStyle } from '@core/domain/entities/FontStyle';
import { CreateDefaultThemeErrors } from './CreateDefaultThemeErrors';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';

@injectable()
export class CreateDefaultThemeUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository,
    @inject(TYPES.ThemeRepository)
    private themeRepository: IThemeRepository
  ) {}

  async execute(
    request: CreateDefaultThemeDTO
  ): Promise<CreateDefaultThemeResponse> {
    try {
      const { userId } = request;

      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return left(new CreateDefaultThemeErrors.UserNotFoundError(userId));
      }

      const existingTheme =
        await this.themeRepository.findThemeByUserId(userId);
      if (existingTheme) {
        return right(Result.ok(existingTheme));
      }

      const defaultThemeData = {
        name: 'Default Theme',
        premium: false,
        isCustom: true,
        ownerId: userId,
        background: Background.create({
          type: 'COLOR',
          style: 'FLAT',
          color: '#808080',
        }),
        buttonStyle: ButtonStyle.create({
          type: 'FILL',
          backgroundColor: '#000000',
          shadowColor: '#000000',
          textColor: '#ffffff',
        }),
        fontStyle: FontStyle.create({
          color: '#000000',
          fontFamily: 'inter',
        }),
      };

      const themeOrError = Theme.create(defaultThemeData, new UniqueEntityID());
      if (themeOrError.isFailure) {
        return left(new CreateDefaultThemeErrors.InvalidThemeDataError());
      }
      const theme = themeOrError.getValue();

      const createdTheme = await this.themeRepository.createTheme(theme);

      user.updateThemeId(createdTheme.id.toString());
      await this.userRepository.updateUser(user);

      return right(Result.ok(createdTheme));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
