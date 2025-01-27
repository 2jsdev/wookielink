import { IP } from '../value-objects/Ip';
import { LinkId } from '../value-objects/LinkId';
import { UserAgent } from '../value-objects/UserAgent';
import { UserId } from '../value-objects/UserId';

export type LinkInteractionProps = {
  id?: string;
  linkId: LinkId;
  userId: UserId;
  ip: IP;
  city?: string;
  region?: string;
  country?: string;
  userAgent: UserAgent;
  os?: string;
  browser?: string;
  screen?: string;
  interactedAt?: Date;
};

export class LinkInteraction {
  constructor(public props: LinkInteractionProps) {
    this.validateProps(props);
  }

  private validateProps(props: LinkInteractionProps): void {
    if (!props.linkId) {
      throw new Error('Link ID is required.');
    }

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
      props.id = LinkId.create().getValue();
    }

    if (!props.interactedAt) {
      props.interactedAt = new Date();
    }
  }

  get id() {
    return this.props.id;
  }

  get linkId() {
    return this.props.linkId.getValue();
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

  get interactedAt() {
    return this.props.interactedAt;
  }

  public toPlainObject() {
    return {
      id: this.id,
      linkId: this.linkId,
      userId: this.userId,
      ip: this.ip,
      city: this.props.city,
      region: this.props.region,
      country: this.props.country,
      userAgent: this.userAgent,
      os: this.props.os,
      browser: this.props.browser,
      screen: this.props.screen,
      interactedAt: this.interactedAt,
    };
  }
}
