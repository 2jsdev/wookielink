import { Link } from '@core/domain/entities/Link';
import { LinkUrl } from '@core/domain/value-objects/LinkUrl';
import { ShortUrl } from '@core/domain/value-objects/ShortUrl';
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
        shortCode: plain.shortCode
          ? ShortUrl.create(plain.shortCode)
          : ShortUrl.create(),
        visits: plain.visits,
        position: plain.position,
        active: plain.active,
        archived: plain.archived,
        prioritize: plain.prioritize,
        createdAt: plain.createdAt,
        userId: plain.userId,
      },
      new UniqueEntityID(plain.id)
    );

    if (linkOrError.isFailure) {
      console.error('Error al mapear a dominio:', linkOrError.getErrorValue());
    }

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
      shortCode: link.shortCode?.value,
      visits: link.visits,
      position: link.position,
      active: link.active,
      archived: link.archived,
      prioritize: link.prioritize,
      createdAt: link.createdAt,
      userId: link.userId,
    };
  }
}
