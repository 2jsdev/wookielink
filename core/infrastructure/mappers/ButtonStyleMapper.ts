import { ButtonStyle } from '@core/domain/entities/ButtonStyle';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export class ButtonStyleMapper {
  public static toDomain(raw: any): ButtonStyle {
    return ButtonStyle.create(
      {
        type: raw.type,
        backgroundColor: raw.backgroundColor,
        shadowColor: raw.shadowColor,
        textColor: raw.textColor,
      },
      new UniqueEntityID(raw.id)
    );
  }

  public static toPersistence(buttonStyle: ButtonStyle): any {
    const payload: any = {
      type: buttonStyle.type,
      backgroundColor: buttonStyle.backgroundColor,
      shadowColor: buttonStyle.shadowColor,
      textColor: buttonStyle.textColor,
    };

    return payload;
  }
}
