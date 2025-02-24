import { Theme } from '@core/domain/entities/Theme';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { BackgroundMapper } from './BackgroundMapper';
import { ButtonStyleMapper } from './ButtonStyleMapper';
import { FontStyleMapper } from './FontStyleMapper';

export class ThemeMapper {
  static toDomain(raw: any): Theme {
    const background = BackgroundMapper.toDomain(raw.background);
    const buttonStyle = ButtonStyleMapper.toDomain(raw.buttonStyle);
    const fontStyle = FontStyleMapper.toDomain(raw.fontStyle);

    const themeOrError = Theme.create(
      {
        name: raw.name,
        premium: raw.premium,
        isCustom: raw.isCustom,
        ownerId: raw.ownerId,
        background,
        buttonStyle,
        fontStyle,
      },
      new UniqueEntityID(raw.id)
    );

    if (themeOrError.isFailure) {
      console.error('Error al mapear Theme:', themeOrError.getErrorValue());
    }

    return themeOrError.getValue();
  }

  static toPersistence(theme: Theme): any {
    const payload: any = {
      id: theme.id.toString(),
      name: theme.name,
      premium: theme.premium,
      isCustom: theme.isCustom,
      ownerId: theme.ownerId,
      backgroundId: theme.background.id.toString(),
      buttonStyleId: theme.buttonStyle.id.toString(),
      fontStyleId: theme.fontStyle.id.toString(),
    };

    return payload;
  }
}
