import { Activity, ActivityType } from '@core/domain/entities/Activity';

export interface IActivityRepository {
  create(activity: Activity): Promise<Activity>;
  findRecentActivityByIp(
    ip: string,
    linkId: string,
    type: ActivityType,
    timeframeSeconds: number
  ): Promise<Activity | null>;
}
