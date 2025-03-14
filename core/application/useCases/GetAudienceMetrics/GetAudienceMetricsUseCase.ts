import { inject, injectable } from 'inversify';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, Result, right } from '@core/shared/core/Result';
import { IActivityRepository } from '@core/domain/repositories/IActivityRepository';
import { GetAudienceMetricsResponse } from './GetAudienceMetricsResponse';
import { GetAudienceMetricsErrors } from './GetAudienceMetricsErrors';
import { AppError } from '@core/shared/core/AppError';

@injectable()
export class GetAudienceMetricsUseCase {
  constructor(
    @inject(TYPES.ActivityRepository)
    private activityRepository: IActivityRepository
  ) {}

  async execute(userId: string): Promise<GetAudienceMetricsResponse> {
    try {
      const locations =
        await this.activityRepository.getMetricsByLocation(userId);
      const devices = await this.activityRepository.getMetricsByDevice(userId);

      if (!locations.length && !devices.length) {
        return left(new GetAudienceMetricsErrors.MetricsNotFoundError());
      }

      const metrics = {
        locations: locations.map((location) => ({
          country: location.country ?? 'Unknown',
          city: location.city ?? 'Unknown',
          views: Number(location.views),
          clicks: Number(location.clicks),
          clickRate: location.views
            ? (Number(location.clicks) / Number(location.views)) * 100
            : 0,
        })),
        devices: devices.map((device) => ({
          deviceType: device.device ?? 'Unknown',
          views: Number(device.views),
          clicks: Number(device.clicks),
          clickRate: device.views
            ? (Number(device.clicks) / Number(device.views)) * 100
            : 0,
        })),
      };

      return right(Result.ok(metrics));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
