'use server';

import { container } from '@core/infrastructure/ioc/container';
import { auth } from '@core/shared/infrastructure/services/auth';
import { GetUserThemeUseCase } from '@core/application/useCases/GetUserTheme/GetUserThemeUseCase';
import { Theme } from '@/interfaces/Theme';

export async function getUserTheme(): Promise<Theme> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id };

    const useCase = container.resolve(GetUserThemeUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    const theme = result.value.getValue();
    return theme.toJSON();
  } catch (error) {
    throw error;
  }
}
