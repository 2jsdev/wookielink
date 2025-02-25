'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { DeleteUserLinkUseCase } from '@core/application/useCases/DeleteUserLink/DeleteUserLinkUseCase';

export async function deleteUserLink({
  linkId,
}: {
  linkId: string;
}): Promise<any> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id, linkId };

    const useCase = container.resolve(DeleteUserLinkUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    return;
  } catch (error) {
    throw error;
  }
}
