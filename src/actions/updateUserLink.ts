'use server';

import { container } from '@core/infrastructure/ioc/container';
import { UpdateUserLinkUseCase } from '@core/application/useCases/UpdateUserLink/UpdateUserLinkUseCase';
import { auth } from '@core/shared/infrastructure/services/auth';
import { Link, LinkLayout } from '@/interfaces/Link';

interface Props {
  id: string;
  title?: string;
  url?: string;
  visible?: boolean;
  archived?: boolean;
  position?: number;
  layout?: LinkLayout;
}

export async function updateUserLink(props: Props): Promise<Link> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = {
      userId: session.user.id,
      link: {
        id: props.id,
        title: props.title,
        url: props.url,
        visible: props.visible,
        archived: props.archived,
        position: props.position,
        layout: props.layout,
      },
    };

    const useCase = container.resolve(UpdateUserLinkUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    const link = result.value.getValue();
    return link.toJSON();
  } catch (error) {
    throw error;
  }
}
