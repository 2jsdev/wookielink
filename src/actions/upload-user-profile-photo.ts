'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UploadUserProfilePhotoUseCase } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoUseCase';
import { User } from '@/interfaces/user';

interface Props {
  photo: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}

export async function uploadUserProfilePhoto(props: Props): Promise<User> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = { photo: props.photo, userId: session.user.id };

    const useCase = container.resolve(UploadUserProfilePhotoUseCase);
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
