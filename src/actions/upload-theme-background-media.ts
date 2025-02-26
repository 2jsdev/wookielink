'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UploadThemeBackgroundMediaUseCase } from '@core/application/useCases/UploadThemeBackgroundMedia/UploadThemeBackgroundMediaUseCase';

interface Props {
  themeId: string;
  backgroundMedia: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}

export async function uploadThemeBackgroundMedia({
  themeId,
  backgroundMedia,
}: Props): Promise<void> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = {
      userId: session.user.id,
      themeId,
      backgroundMedia,
    };

    const useCase = container.resolve(UploadThemeBackgroundMediaUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }
  } catch (error) {
    throw error;
  }
}
