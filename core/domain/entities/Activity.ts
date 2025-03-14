import { AggregateRoot } from '@core/shared/domain/AggregateRoot';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { Guard } from '@core/shared/core/Guard';
import { Result } from '@core/shared/core/Result';

export enum ActivityType {
  View = 'View',
  Click = 'Click',
}

export interface ActivityProps {
  type: ActivityType;
  userId: string;
  linkId: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent: string;
  os?: string;
  browser?: string;
  screen?: string;
  timestamp?: Date;
  loc?: string;
  org?: string;
  timezone?: string;
}

export class Activity extends AggregateRoot<ActivityProps> {
  private constructor(props: ActivityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ActivityProps,
    id?: UniqueEntityID
  ): Result<Activity> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.type, argumentName: 'type' },
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.linkId, argumentName: 'linkId' },
      { argument: props.ip, argumentName: 'ip' },
      { argument: props.userAgent, argumentName: 'userAgent' },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Activity>(guardResult.getErrorValue());
    }

    const activity = new Activity(
      {
        ...props,
        timestamp: props.timestamp ?? new Date(),
      },
      id
    );

    return Result.ok<Activity>(activity);
  }

  public get type() {
    return this.props.type;
  }

  public get userId() {
    return this.props.userId;
  }

  public get linkId() {
    return this.props.linkId;
  }

  public get ip() {
    return this.props.ip;
  }

  public get city() {
    return this.props.city;
  }

  public get region() {
    return this.props.region;
  }

  public get country() {
    return this.props.country;
  }

  public get userAgent() {
    return this.props.userAgent;
  }

  public get os() {
    return this.props.os;
  }

  public get browser() {
    return this.props.browser;
  }

  public get screen() {
    return this.props.screen;
  }

  public get timestamp() {
    return this.props.timestamp;
  }

  public get loc() {
    return this.props.loc;
  }

  public get org() {
    return this.props.org;
  }

  public get timezone() {
    return this.props.timezone;
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      type: this.props.type,
      userId: this.props.userId,
      linkId: this.props.linkId,
      ip: this.props.ip,
      city: this.props.city,
      region: this.props.region,
      country: this.props.country,
      userAgent: this.props.userAgent,
      os: this.props.os,
      browser: this.props.browser,
      screen: this.props.screen,
      timestamp: this.props.timestamp?.toISOString(),
      loc: this.props.loc,
      org: this.props.org,
      timezone: this.props.timezone,
    };
  }
}
