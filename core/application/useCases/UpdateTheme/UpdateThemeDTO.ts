import {
  BackgroundStyleType,
  BackgroundType,
} from '@core/domain/entities/Background';
import { ButtonType } from '@core/domain/entities/ButtonStyle';
import { FontFamily } from '@core/domain/entities/FontStyle';

export interface UpdateThemeDTO {
  userId: string;
  theme: {
    id: string;
    name?: string;
    premium?: boolean;
    isCustom?: boolean;
    ownerId?: string;
    background?: {
      id: string;
      type: BackgroundType;
      style?: BackgroundStyleType;
      color: string;
      imageUrl?: string;
      videoUrl?: string;
    };
    buttonStyle?: {
      id?: string;
      type: ButtonType;
      backgroundColor: string;
      shadowColor: string;
      textColor: string;
    };
    fontStyle?: {
      id?: string;
      color: string;
      fontFamily: FontFamily;
    };
  };
}
