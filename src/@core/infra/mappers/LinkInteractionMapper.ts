import { LinkInteraction } from '@/@core/domain/entities/LinkInteraction';
import { LinkInteractionProps } from '@/@core/domain/entities/LinkInteraction';

export class LinkInteractionMapper {
  public static toDomain(raw: any): LinkInteraction {
    const props: LinkInteractionProps = {
      id: raw.id,
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
      interactedAt: raw.interactedAt,
    };

    return new LinkInteraction(props);
  }

  public static toPersistence(interaction: LinkInteraction): any {
    return {
      id: interaction.id,
      linkId: interaction.linkId,
      userId: interaction.userId,
      ip: interaction.ip,
      city: interaction.props.city,
      region: interaction.props.region,
      country: interaction.props.country,
      userAgent: interaction.userAgent,
      os: interaction.props.os,
      browser: interaction.props.browser,
      screen: interaction.props.screen,
      interactedAt: interaction.interactedAt,
    };
  }
}
