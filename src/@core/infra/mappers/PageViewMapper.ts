import { PageView } from '@/@core/domain/entities/PageView';
import { PageViewProps } from '@/@core/domain/entities/PageView';

export class PageViewMapper {
  public static toDomain(raw: any): PageView {
    const props: PageViewProps = {
      id: raw.id,
      userId: raw.userId,
      ip: raw.ip,
      city: raw.city,
      region: raw.region,
      country: raw.country,
      userAgent: raw.userAgent,
      os: raw.os,
      browser: raw.browser,
      screen: raw.screen,
      viewedAt: raw.viewedAt,
    };

    return new PageView(props);
  }

  public static toPersistence(pageView: PageView): any {
    return {
      id: pageView.id,
      userId: pageView.userId,
      ip: pageView.ip,
      city: pageView.props.city,
      region: pageView.props.region,
      country: pageView.props.country,
      userAgent: pageView.userAgent,
      os: pageView.props.os,
      browser: pageView.props.browser,
      screen: pageView.props.screen,
      viewedAt: pageView.viewedAt,
    };
  }
}
