import { Link } from '@core/domain/entities/Link';
import { LinkUrl } from '@core/domain/value-objects/LinkUrl';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export class LinkMapper {
  static toDomain(raw: any): Link {
    const plain = JSON.parse(JSON.stringify(raw));

    const linkOrError = Link.create(
      {
        type: plain.type,
        layout: plain.layout,
        icon: plain.icon,
        ...(plain.thumbnail && { thumbnail: plain.thumbnail }),
        title: plain.title,
        url: LinkUrl.create(plain.url),
        position: plain.position,
        active: plain.active,
        archived: plain.archived,
        prioritize: plain.prioritize,
        createdAt: plain.createdAt,
        userId: plain.userId,
      },
      new UniqueEntityID(plain.id)
    );

    linkOrError.isFailure ? console.log(linkOrError.getErrorValue()) : '';

    return linkOrError.getValue();
  }
  static toPersistence(link: Link): any {
    return {
      id: link.id.toString(),
      type: link.type,
      layout: link.layout,
      icon: link.icon,
      thumbnail: link.thumbnail ?? null,
      title: link.title,
      url: link.url?.value,
      position: link.position,
      active: link.active,
      archived: link.archived,
      prioritize: link.prioritize,
      createdAt: link.createdAt,
      userId: link.userId,
    };
  }
}
