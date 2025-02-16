'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { DeleteUserProfilePhotoUseCase } from '@core/application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoUseCase';

export async function deleteUserProfilePhoto(): Promise<void> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id };

    const useCase = container.resolve(DeleteUserProfilePhotoUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    return;
  } catch (error) {
    throw error;
  }
}
