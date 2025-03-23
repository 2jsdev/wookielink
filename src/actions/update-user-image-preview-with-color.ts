'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UpdateUserImagePreviewWithColorUseCase } from '@core/application/useCases/UpdateUserImagePreviewWithColor/UpdateUserImagePreviewWithColorUseCase';
import { User } from '@/interfaces/user';

interface Props {
  imagePreviewBgColor: string;
}

export async function updateUserImagePreviewWithColor(
  props: Props
): Promise<User> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('User not authenticated');
    }

    const useCase = container.resolve(UpdateUserImagePreviewWithColorUseCase);

    const result = await useCase.execute({
      userId: session.user.id,
      imagePreviewBgColor: props.imagePreviewBgColor,
    });

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    const user = result.value.getValue();
    return user.toJSON();
  } catch (err) {
    console.error('[updateUserImagePreviewWithColor]', err);
    throw err;
  }
}
