'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UpdateUserThemeSelectionUseCase } from '@core/application/useCases/UpdateUserThemeSelection/UpdateUserThemeSelectionUseCase';
import { User } from '@/interfaces/user';

export interface UpdateUserThemeSelectionProps {
  themeId: string;
}

export async function updateUserThemeSelection(
  props: UpdateUserThemeSelectionProps
): Promise<User> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = {
      userId: session.user.id,
      themeId: props.themeId,
    };

    const useCase = container.resolve(UpdateUserThemeSelectionUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    const user = result.value.getValue();
    return user.toJSON();
  } catch (error) {
    throw error;
  }
}
