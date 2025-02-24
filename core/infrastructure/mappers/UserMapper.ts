import { User } from '@core/domain/entities/User';
import { LinkMapper } from '@core/infrastructure/mappers/LinkMapper';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export class UserMapper {
  static toDomain(raw: any): User {
    const plain = JSON.parse(JSON.stringify(raw));

    const links = plain.links?.map((link: any) => LinkMapper.toDomain(link));

    const userOrError = User.create(
      {
        name: plain.name,
        email: plain.email,
        username: plain.username,
        layout: plain.layout,
        ...(plain.image && { image: plain.image }),
        ...(plain.bio && { bio: plain.bio }),
        ...(plain.themeId && { themeId: plain.themeId }),
        ...(links && links.length > 0 && { links }),
      },
      new UniqueEntityID(plain.id)
    );

    if (userOrError.isFailure) {
      console.error(userOrError.getErrorValue());
    }

    return userOrError.getValue();
  }

  static toPersistence(user: User): any {
    const payload: any = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      layout: user.layout,
      image: user.image ?? null,
      bio: user.bio ?? null,
      themeId: user.themeId ?? null,
    };

    if (user.links && user.links.length > 0) {
      payload.links = user.links.map((link) => LinkMapper.toPersistence(link));
    }

    return payload;
  }
}
