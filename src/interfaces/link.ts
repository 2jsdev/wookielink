import { OpenGraph } from '@/interfaces/open-graph';

export enum LinkType {
  Link = 'Link',
  SocialIcon = 'SocialIcon',
}

export enum LinkLayout {
  Classic = 'Classic',
  Feature = 'Feature',
}

export interface Link {
  id: string;
  type?: LinkType;
  layout?: LinkLayout;
  icon?: string;
  thumbnail?: string | null;
  title?: string;
  url?: string;
  shortCode?: string;
  fullShortUrl?: string;
  visits?: number;
  position: number;
  active?: boolean;
  archived?: boolean;
  prioritize?: boolean;
  createdAt?: Date;
  ogData?: OpenGraph;
  userId: string;
}
