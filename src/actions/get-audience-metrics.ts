'use server';

import { container } from '@core/infrastructure/ioc/container';
import { GetAudienceMetricsUseCase } from '@core/application/useCases/GetAudienceMetrics/GetAudienceMetricsUseCase';
import { auth } from '@core/shared/infrastructure/services/auth';

export interface AudienceMetricsData {
  locations: {
    country: string;
    city: string;
    views: number;
    clicks: number;
    clickRate: number;
  }[];
  devices: {
    deviceType: string;
    views: number;
    clicks: number;
    clickRate: number;
  }[];
}

export async function getAudienceMetrics(): Promise<AudienceMetricsData> {
  try {
    const session = await auth();
    if (!session) throw new Error('User not authenticated');

    const useCase = container.resolve(GetAudienceMetricsUseCase);
    const result = await useCase.execute(session.user.id);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    return result.value.getValue();
  } catch (error) {
    throw error;
  }
}
