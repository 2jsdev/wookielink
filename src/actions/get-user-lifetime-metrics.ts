'use server';

import { container } from '@core/infrastructure/ioc/container';
import { auth } from '@core/shared/infrastructure/services/auth';
import { GetUserLifetimeMetricsUseCase } from '@core/application/useCases/GetUserLifetimeMetrics/GetUserLifetimeMetricsUseCase';

export async function getUserLifetimeMetrics(): Promise<{
  views: number;
  clicks: number;
  clickRate: number;
}> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const userId = session.user.id;

    const useCase = container.resolve(GetUserLifetimeMetricsUseCase);
    const result = await useCase.execute(userId);

    return result;
  } catch (error) {
    throw error;
  }
}
