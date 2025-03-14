import { ActivityType } from '@core/domain/entities/Activity';

export interface RegisterActivityDTO {
  type: ActivityType;
  linkId: string;
  userId: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent: string;
  os?: string;
  browser?: string;
  screen?: string;
  loc?: string;
  org?: string;
  timezone?: string;
}
