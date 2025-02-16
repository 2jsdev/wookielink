import { Guard } from '@core/shared/core/Guard';
import { Result } from '@core/shared/core/Result';
import { AggregateRoot } from '@core/shared/domain/AggregateRoot';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { LinkUrl } from '@core/domain/value-objects/LinkUrl';
import { OpenGraph } from '@core/application/services/OpenGraphService';

export enum LinkType {
  Link = 'Link',
  SocialIcon = 'SocialIcon',
}

export enum LinkLayout {
  Classic = 'Classic',
  Feature = 'Feature',
}

export interface LinkProps {
  type?: LinkType;
  layout?: LinkLayout;
  icon?: string;
  thumbnail?: string | null;
  title?: string;
  url?: LinkUrl;
  position: number;
  active?: boolean;
  archived?: boolean;
  prioritize?: boolean;
  createdAt?: Date;
  ogData?: OpenGraph;
  userId: string;
}

export class Link extends AggregateRoot<LinkProps> {
  private constructor(props: LinkProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: LinkProps, id?: UniqueEntityID): Result<Link> {
    const guardResult = Guard.againstNullOrUndefined(props.userId, 'userId');
    if (guardResult.isFailure) {
      return Result.fail<Link>(guardResult.getErrorValue());
    }

    const isNewLink = !!id === false;

    const defaultValues: LinkProps = {
      ...props,
      type: props.type || LinkType.Link,
      layout: props.layout || LinkLayout.Classic,
      url: props.url || LinkUrl.create(''),
      active: props.active || false,
      archived: props.archived || false,
      prioritize: props.prioritize || false,
      createdAt: props.createdAt || new Date(),
      ogData: props.ogData,
    };

    const link = new Link(defaultValues, id);

    if (isNewLink) {
      // link.addDomainEvent(new LinkCreated(link));
    }

    return Result.ok<Link>(link);
  }

  public get type() {
    return this.props.type;
  }

  public get layout() {
    return this.props.layout;
  }

  public get icon() {
    return this.props.icon;
  }

  public get thumbnail() {
    return this.props.thumbnail;
  }

  public get title() {
    return this.props.title;
  }

  public get url() {
    return this.props.url;
  }

  public get position() {
    return this.props.position;
  }

  public get active() {
    return this.props.active;
  }

  public get archived() {
    return this.props.archived;
  }

  public get prioritize() {
    return this.props.prioritize;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get userId() {
    return this.props.userId;
  }

  public get ogData() {
    return this.props.ogData;
  }

  public updateTitle(title: string) {
    this.props.title = title;
  }

  public updateUrl(url: string) {
    this.props.url = LinkUrl.create(url);
  }

  public updateIcon(icon: string) {
    this.props.icon = icon;
  }

  public updateThumbnail(thumbnail: string) {
    this.props.thumbnail = thumbnail;
  }

  public deleteThumbnail() {
    this.props.thumbnail = null;
  }

  public updateLayout(layout: LinkLayout) {
    this.props.layout = layout;
  }

  public updateType(type: LinkType) {
    this.props.type = type;
  }

  public updatePosition(position: number) {
    this.props.position = position;
  }

  public activate() {
    this.props.active = true;
  }

  public deactivate() {
    this.props.active = false;
  }

  public archive() {
    this.props.archived = true;
  }

  public unarchive() {
    this.props.archived = false;
  }

  public prioritizeLink() {
    this.props.prioritize = true;
  }

  public deprioritizeLink() {
    this.props.prioritize = false;
  }

  public updateOpenGraph(ogData: OpenGraph) {
    this.props.ogData = ogData;
  }

  public static isLink(link: Link): boolean {
    return link.type === LinkType.Link;
  }

  public static isSocialIcon(link: Link): boolean {
    return link.type === LinkType.SocialIcon;
  }

  public static isClassicLayout(link: Link): boolean {
    return link.layout === LinkLayout.Classic;
  }

  public static isFeatureLayout(link: Link): boolean {
    return link.layout === LinkLayout.Feature;
  }

  public static isLinkActive(link: Link): boolean {
    return link.active ?? false;
  }

  public static isLinkArchived(link: Link): boolean {
    return link.archived ?? false;
  }

  public static isLinkPrioritized(link: Link): boolean {
    return link.prioritize ?? false;
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      type: this.props.type,
      layout: this.props.layout,
      icon: this.props.icon,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      url: this.props.url?.value,
      position: this.props.position,
      active: this.props.active,
      archived: this.props.archived,
      prioritize: this.props.prioritize,
      createdAt: this.props.createdAt,
      userId: this.props.userId,
      ogData: this.props.ogData,
    };
  }
}
