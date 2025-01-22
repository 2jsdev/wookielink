import { Url } from '../value-objects/Url';
import { LinkId } from '../value-objects/LinkId';
import { UserId } from '../value-objects/UserId';

export type LinkProps = {
  id?: LinkId;
  label: string;
  url: Url;
  visible: boolean;
  order: number;
  archived: boolean;
  createdAt?: Date;
  userId: UserId;
};

export class Link {
  constructor(public props: LinkProps) {
    this.validateProps(props);
  }

  private validateProps(props: LinkProps): void {
    if (!props.label || props.label.trim() === '') {
      throw new Error('Label must not be empty.');
    }

    if (!props.url) {
      throw new Error('URL is required.');
    }

    if (!props.userId || props.userId.getValue().trim() === '') {
      throw new Error('UserId is required.');
    }

    if (props.order < 0) {
      throw new Error('Order must be a non-negative integer.');
    }

    if (!props.id) {
      this.props.id = LinkId.create();
    }
  }

  get id() {
    return this.props.id?.getValue();
  }

  get label() {
    return this.props.label;
  }

  get url() {
    return this.props.url.getValue();
  }

  get visible() {
    return this.props.visible;
  }

  get order() {
    return this.props.order;
  }

  get archived() {
    return this.props.archived;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get userId() {
    return this.props.userId.getValue();
  }

  public setOrder(order: number) {
    this.props.order = order;
  }

  public archive() {
    this.props.archived = true;
    this.props.visible = false;
  }

  public unarchive() {
    this.props.archived = false;
    this.props.visible = false;
  }

  public static create(props: LinkProps): Link {
    return new Link(props);
  }

  public toPlainObject() {
    return {
      id: this.id,
      label: this.label,
      url: this.url,
      visible: this.visible,
      order: this.order,
      archived: this.archived,
      createdAt: this.createdAt,
      userId: this.userId,
    };
  }
}
