import { Either, Result } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { GetAudienceMetricsErrors } from './GetAudienceMetricsErrors';

export interface AudienceMetricItem {
  views: number;
  clicks: number;
  clickRate: number;
}

export interface LocationMetric extends AudienceMetricItem {
  country: string;
  city: string;
}

export interface DeviceMetric extends AudienceMetricItem {
  deviceType: string;
}

export interface GetAudienceMetricsDTO {
  locations: LocationMetric[];
  devices: DeviceMetric[];
}

export type GetAudienceMetricsResponse = Either<
  GetAudienceMetricsErrors.MetricsNotFoundError | AppError.UnexpectedError,
  Result<GetAudienceMetricsDTO>
>;
