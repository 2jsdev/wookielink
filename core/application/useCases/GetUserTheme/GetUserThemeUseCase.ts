import { injectable, inject } from 'inversify';
import { GetUserThemeDTO } from '@core/application/useCases/GetUserTheme/GetUserThemeDTO';
import { GetUserThemeResponse } from '@core/application/useCases/GetUserTheme/GetUserThemeResponse';
import { IThemeRepository } from '@core/domain/repositories/IThemeRepository';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, right, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { CreateDefaultThemeUseCase } from '../CreateDefaultTheme/CreateDefaultThemeUseCase';

@injectable()
export class GetUserThemeUseCase {
  constructor(
    @inject(TYPES.ThemeRepository)
    private themeRepository: IThemeRepository,
    @inject(TYPES.CreateDefaultThemeUseCase)
    private createDefaultThemeUseCase: CreateDefaultThemeUseCase
  ) {}

  async execute(request: GetUserThemeDTO): Promise<GetUserThemeResponse> {
    try {
      const { userId } = request;

      let theme = await this.themeRepository.findThemeByUserId(userId);

      if (!theme) {
        const defaultThemeResult = await this.createDefaultThemeUseCase.execute(
          { userId }
        );
        if (defaultThemeResult.isLeft()) {
          return left(
            new AppError.UnexpectedError(
              defaultThemeResult.value.getErrorValue().message
            )
          );
        }
        theme = defaultThemeResult.value.getValue();
      }

      return right(Result.ok(theme));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
