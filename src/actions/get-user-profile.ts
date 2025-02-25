'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { GetUserProfileUseCase } from '@core/application/useCases/GetUserProfile/GetUserProfileUseCase';
import { User } from '@/interfaces/user';

export async function getUserProfile(): Promise<User> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id };

    const useCase = container.resolve(GetUserProfileUseCase);
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
