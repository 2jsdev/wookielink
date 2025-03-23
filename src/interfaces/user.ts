import { Link } from '@/interfaces/link';
import { Theme } from '@/interfaces/theme';

export enum ProfileLayout {
  Classic = 'Classic',
  Hero = 'Hero',
}

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  image?: string | null;
  imagePreview?: string | null;
  imagePreviewBgColor?: string | null;
  bio?: string;
  layout?: ProfileLayout;
  themeId?: string;
  links?: Link[];
  theme?: Theme;
}
