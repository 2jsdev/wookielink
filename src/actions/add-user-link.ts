'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { AddUserLinkUseCase } from '@core/application/useCases/AddUserLink/AddUserLinkUseCase';
import { ActionResponse } from '@/interfaces/server-action-response';
import { Link } from '@/interfaces/link';

export interface Props {
  title?: string;
  url?: string;
}

export async function addUserLink({
  title,
  url,
}: Props): Promise<ActionResponse<Link>> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = {
      userId: session.user.id,
      link: {
        title: title ?? '',
        url: url ?? '',
        position: 0,
      },
    };

    const useCase = container.resolve(AddUserLinkUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      return {
        ok: false,
        message: result.value.getErrorValue().message,
        data: null,
      };
    }

    const link = result.value.getValue();

    return {
      ok: true,
      data: link.toJSON(),
    };
  } catch (error) {
    throw error;
  }
}
