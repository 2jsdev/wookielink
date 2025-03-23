'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UpdateUserProfileUseCase } from '@core/application/useCases/UpdateUserProfile/UpdateUserProfileUseCase';
import { User } from '@/interfaces/user';

interface Props {
  name?: string;
  email?: string;
  username?: string;
  image?: string;
  imagePreview?: string;
  imagePreviewBgColor?: string;
  bio?: string;
}

export async function updateUserProfile(props: Props): Promise<User> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { ...props, userId: session.user.id };

    const updateUserProfileUseCase = container.resolve(
      UpdateUserProfileUseCase
    );

    const result = await updateUserProfileUseCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    const user = result.value.getValue();
    return user.toJSON();
  } catch (error) {
    throw error;
  }
}
