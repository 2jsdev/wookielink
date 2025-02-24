export const backgroundTypes = {
  COLOR: 'COLOR',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  ANIMATED: 'ANIMATED',
} as const;

export type BackgroundType = keyof typeof backgroundTypes;

export const backgroundStyles = {
  FLAT: 'FLAT',
  COLORUP: 'COLORUP',
  COLORDOWN: 'COLORDOWN',
  POLKA: 'POLKA',
  STRIPE: 'STRIPE',
  WAVES: 'WAVES',
  ZIGZAG: 'ZIGZAG',
} as const;

export type BackgroundStyleType = keyof typeof backgroundStyles;

export const gradientDirections = {
  COLORUP: 'COLORUP',
  COLORDOWN: 'COLORDOWN',
} as const;

export type GradientDirection = keyof typeof gradientDirections;

export interface Background {
  id: string;
  type: BackgroundType;
  style?: BackgroundStyleType;
  color: string;
  imageUrl?: string;
  videoUrl?: string;
}

export const buttonTypes = {
  FILL: 'FILL',
  FILL_ROUNDED: 'FILL_ROUNDED',
  FILL_CIRCULAR: 'FILL_CIRCULAR',
  OUTLINE: 'OUTLINE',
  OUTLINE_ROUNDED: 'OUTLINE_ROUNDED',
  OUTLINE_CIRCULAR: 'OUTLINE_CIRCULAR',
  SOFTSHADOW: 'SOFTSHADOW',
  SOFTSHADOW_ROUNDED: 'SOFTSHADOW_ROUNDED',
  SOFTSHADOW_CIRCULAR: 'SOFTSHADOW_CIRCULAR',
  HARDSHADOW: 'HARDSHADOW',
  HARDSHADOW_ROUNDED: 'HARDSHADOW_ROUNDED',
  HARDSHADOW_CIRCULAR: 'HARDSHADOW_CIRCULAR',
} as const;

export type ButtonType = keyof typeof buttonTypes;

export interface ButtonStyle {
  id?: string;
  type: ButtonType;
  backgroundColor: string;
  shadowColor: string;
  textColor: string;
}

export const fonts = {
  inter: 'Inter',
  roboto: 'Roboto',
  montserrat: 'Montserrat',
  poppins: 'Poppins',
  'overpass-mono': 'Overpass Mono',
} as const;

export type FontFamily = keyof typeof fonts;

export interface FontStyle {
  color: string;
  fontFamily: FontFamily;
}

export interface Theme {
  id: string;
  name: string;
  premium: boolean;
  isCustom: boolean;
  ownerId?: string;
  background: Background;
  buttonStyle: ButtonStyle;
  fontStyle: FontStyle;
}
