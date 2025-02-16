'use server';

import { container } from '@core/infrastructure/ioc/container';
import { auth } from '@core/shared/infrastructure/services/auth';
import { ReorderUserLinksUseCase } from '@core/application/useCases/ReorderUserLinks/ReorderUserLinksUseCase';

export async function reorderUserLinks(
  newOrder: Array<{ id: string; position: number }>
): Promise<void> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id, links: newOrder };

    const useCase = container.resolve(ReorderUserLinksUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    return;
  } catch (error) {
    console.error('Error in reorderUserLinks:', error);
    throw error;
  }
}
