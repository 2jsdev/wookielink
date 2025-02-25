'use server';

import { container } from '@core/infrastructure/ioc/container';
import { CheckUsernameAvailabilityUseCase } from '@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityUseCase';

interface Props {
  username: string;
}

export async function checkUsernameAvailability({
  username,
}: Props): Promise<boolean> {
  try {
    const dto = { username };

    const useCase = container.resolve(CheckUsernameAvailabilityUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      return false;
    }

    return result.value.getValue();
  } catch (error) {
    throw error;
  }
}
