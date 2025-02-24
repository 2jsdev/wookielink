import { Link } from '@/interfaces/Link';
import { Theme } from '@/interfaces/Theme';

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
  bio?: string;
  layout?: ProfileLayout;
  themeId?: string;
  links?: Link[];
  theme?: Theme;
}
