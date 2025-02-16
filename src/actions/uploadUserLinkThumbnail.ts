'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UploadUserLinkThumbnailUseCase } from '@core/application/useCases/UploadUserLinkThumbnail/UploadUserLinkThumbnailUseCase';
import { Link } from '@/interfaces/Link';

interface Props {
  linkId: string;
  thumbnail: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}

export async function uploadUserLinkThumbnail(props: Props): Promise<Link> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = {
      userId: session.user.id,
      linkId: props.linkId,
      thumbnail: props.thumbnail,
    };

    const useCase = container.resolve(UploadUserLinkThumbnailUseCase);
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
