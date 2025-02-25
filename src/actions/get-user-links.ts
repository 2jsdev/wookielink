'use server';

import { container } from '@core/infrastructure/ioc/container';
import { GetUserLinksUseCase } from '@core/application/useCases/GetUserLinks/GetUserLinksUseCase';
import { auth } from '@core/shared/infrastructure/services/auth';
import { Link } from '@/interfaces/link';

export async function getUserLinks(): Promise<Link[]> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id };

    const useCase = container.resolve(GetUserLinksUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      return [];
    }

    const links = result.value.getValue().map((link) => link.toJSON());
    return links;
  } catch (error) {
    throw error;
  }
}
