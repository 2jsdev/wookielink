import { Background } from '@core/domain/entities/Background';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export class BackgroundMapper {
  public static toDomain(raw: any): Background {
    return Background.create(
      {
        type: raw.type,
        style: raw.style,
        color: raw.color,
        imageUrl: raw.imageUrl,
        videoUrl: raw.videoUrl,
      },
      new UniqueEntityID(raw.id)
    );
  }

  public static toPersistence(background: Background): any {
    const payload: any = {
      type: background.type,
      style: background.style,
      color: background.color,
      imageUrl: background.imageUrl || null,
      videoUrl: background.videoUrl || null,
    };

    return payload;
  }
}
