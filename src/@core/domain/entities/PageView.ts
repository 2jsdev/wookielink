import { IP } from '../value-objects/Ip';
import { UserAgent } from '../value-objects/UserAgent';
import { UserId } from '../value-objects/UserId';

export type PageViewProps = {
  id?: string;
  userId: UserId;
  ip: IP;
  city?: string;
  region?: string;
  country?: string;
  userAgent: UserAgent;
  os?: string;
  browser?: string;
  screen?: string;
  viewedAt?: Date;
};

export class PageView {
  constructor(public props: PageViewProps) {
    this.validateProps(props);
  }

  private validateProps(props: PageViewProps): void {
    if (!props.userId) {
      throw new Error('User ID is required.');
    }

    if (!props.ip) {
      throw new Error('IP address is required.');
    }

    if (!props.userAgent) {
      throw new Error('User agent is required.');
    }

    if (!props.id) {
      props.id = UserId.create().getValue();
    }

    if (!props.viewedAt) {
      props.viewedAt = new Date();
    }
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId.getValue();
  }

  get ip() {
    return this.props.ip.getValue();
  }

  get userAgent() {
    return this.props.userAgent.getValue();
  }

  get viewedAt() {
    return this.props.viewedAt;
  }

  public toPlainObject() {
    return {
      id: this.id,
      userId: this.userId,
      ip: this.ip,
      city: this.props.city,
      region: this.props.region,
      country: this.props.country,
      userAgent: this.userAgent,
      os: this.props.os,
      browser: this.props.browser,
      screen: this.props.screen,
      viewedAt: this.viewedAt,
    };
  }
}
