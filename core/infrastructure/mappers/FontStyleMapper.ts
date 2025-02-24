import { FontStyle } from '@core/domain/entities/FontStyle';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export class FontStyleMapper {
  public static toDomain(raw: any): FontStyle {
    return FontStyle.create(
      {
        color: raw.color,
        fontFamily: raw.fontFamily,
      },
      new UniqueEntityID(raw.id)
    );
  }

  public static toPersistence(fontStyle: FontStyle): any {
    const payload: any = {
      color: fontStyle.color,
      fontFamily: fontStyle.fontFamily,
    };

    return payload;
  }
}
