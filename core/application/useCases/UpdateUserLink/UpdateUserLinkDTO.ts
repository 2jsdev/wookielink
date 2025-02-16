import { LinkLayout } from '@core/domain/entities/Link';

export interface UpdateUserLinkDTO {
  userId: string;
  link: {
    id: string;
    title?: string;
    url?: string;
    visible?: boolean;
    archived?: boolean;
    position?: number;
    layout?: LinkLayout;
  };
}
