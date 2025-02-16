'use server';

import { container } from '@core/infrastructure/ioc/container';
import { GetPublicProfileUseCase } from '@core/application/useCases/GetPublicProfile/GetPublicProfileUseCase';
import { User } from '@/interfaces/User';

interface Props {
  username: string;
}

export async function getPublicProfile({
  username,
}: Props): Promise<User | null> {
  try {
    const dto = { username };

    const useCase = container.resolve(GetPublicProfileUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      return null;
    }
    const user = result.value.getValue();
    return user.toJSON();
  } catch (error) {
    console.log('getPublicProfile error', error);
    throw error;
  }
}
