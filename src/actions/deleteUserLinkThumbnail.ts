'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { DeleteUserLinkThumbnailUseCase } from '@core/application/useCases/DeleteUserLinkThumbnail/DeleteUserLinkThumbnailUseCase';

interface Props {
  linkId: string;
}

export async function deleteUserLinkThumbnail({
  linkId,
}: Props): Promise<void> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { userId: session.user.id, linkId };

    const useCase = container.resolve(DeleteUserLinkThumbnailUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    return;
  } catch (error) {
    throw error;
  }
}
