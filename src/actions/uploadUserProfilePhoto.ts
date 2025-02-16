'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UploadUserProfilePhotoUseCase } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoUseCase';
import { User } from '@/interfaces/User';

export async function uploadUserProfilePhoto(
  formData: FormData
): Promise<User> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const file = formData.get('photo');
    if (!(file instanceof File)) {
      throw new Error('No photo file provided');
    }

    const arrayBuffer = await file.arrayBuffer();

    const photoProps = {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.name.split('.').pop() || '',
      content: arrayBuffer,
    };

    const dto = { photo: photoProps, userId: session.user.id };

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
