'use server';

import { auth } from '@core/shared/infrastructure/services/auth';
import { container } from '@core/infrastructure/ioc/container';
import { UpdateThemeUseCase } from '@core/application/useCases/UpdateTheme/UpdateThemeUseCase';
import {
  BackgroundStyleType,
  BackgroundType,
  ButtonType,
  FontFamily,
  Theme,
} from '@/interfaces/Theme';

export interface UpdateThemeProps {
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
}

export async function updateTheme(props: UpdateThemeProps): Promise<Theme> {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const dto = {
      userId: session.user.id,
      theme: {
        id: props.id,
        name: props.name,
        ownerId: props.ownerId,
        background: props.background,
        buttonStyle: props.buttonStyle,
        fontStyle: props.fontStyle,
      },
    };

    const useCase = container.resolve(UpdateThemeUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      throw new Error(result.value.getErrorValue().message);
    }

    const theme = result.value.getValue();
    return theme.toJSON();
  } catch (error) {
    throw error;
  }
}
