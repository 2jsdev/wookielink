import { Activity } from '@core/domain/entities/Activity';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export class ActivityMapper {
  static toDomain(raw: any): Activity {
    const activityOrError = Activity.create(
      {
        type: raw.type,
        linkId: raw.linkId,
        userId: raw.userId,
        ip: raw.ip,
        city: raw.city,
        region: raw.region,
        country: raw.country,
        userAgent: raw.userAgent,
        os: raw.os,
        browser: raw.browser,
        screen: raw.screen,
        loc: raw.loc,
        org: raw.org,
        timezone: raw.timezone,
      },
      new UniqueEntityID(raw.id)
    );

    return activityOrError.getValue();
  }

  static toPersistence(activity: Activity): any {
    const payload: any = {
      id: activity.id.toString(),
      type: activity.type,
      linkId: activity.linkId,
      userId: activity.userId,
      ip: activity.ip,
      city: activity.city,
      region: activity.region,
      country: activity.country,
      userAgent: activity.userAgent,
      os: activity.os,
      browser: activity.browser,
      screen: activity.screen,
      loc: activity.loc,
      org: activity.org,
      timezone: activity.timezone,
    };

    return payload;
  }
}
