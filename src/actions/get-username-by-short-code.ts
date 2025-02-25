'use server';

import { container } from '@core/infrastructure/ioc/container';
import { GetUsernameByShortCodeUseCase } from '@core/application/useCases/GetUsernameByShortCode/GetUsernameByShortCodeUseCase';

interface Props {
  shortCode: string;
}

export async function getUsernameByShortCode({
  shortCode,
}: Props): Promise<string | null> {
  try {
    const dto = { shortCode };

    const useCase = container.resolve(GetUsernameByShortCodeUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      return null;
    }

    return result.value.getValue();
  } catch (error) {
    throw error;
  }
}
