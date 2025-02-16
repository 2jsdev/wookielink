import { Guard } from '@core/shared/core/Guard';
import { Result } from '@core/shared/core/Result';
import { AggregateRoot } from '@core/shared/domain/AggregateRoot';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { Link } from './Link';

export enum ProfileLayout {
  Classic = 'Classic',
  Hero = 'Hero',
}

export interface UserProps {
  name: string;
  email: string;
  username?: string;
  image?: string | null;
  bio?: string;
  layout?: ProfileLayout;
  themeId?: string;
  links?: Link[];
  // activities?: Activity[];
  // collections?: Collection[];
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue());
    }

    // check if is a new user or an existing one
    const isNewUser = !!id === false;

    const defaultValues: UserProps = {
      ...props,
      username: props.username,
      image: props.image,
      bio: props.bio,
      layout: props.layout || ProfileLayout.Classic,
      themeId: props.themeId,
    };

    const user = new User(defaultValues, id);

    // user.addDomainEvent(new UserCreatedEvent(user));

    if (isNewUser) {
      // user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<User>(user);
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get username() {
    return this.props.username;
  }

  public get image() {
    return this.props.image;
  }

  public get bio() {
    return this.props.bio;
  }

  public get layout() {
    return this.props.layout ?? ProfileLayout.Classic;
  }

  public get themeId() {
    return this.props.themeId;
  }

  public get links() {
    return this.props.links;
  }

  public updateName(newName: string) {
    this.props.name = newName;
  }

  public updateEmail(newEmail: string) {
    this.props.email = newEmail;
  }

  public updateUsername(newUsername: string) {
    this.props.username = newUsername;
  }

  public updateImage(newImage: string) {
    this.props.image = newImage;
  }

  public deleteImage() {
    this.props.image = null;
  }

  public updateBio(newBio: string) {
    this.props.bio = newBio;
  }

  public updateLayout(newLayout: ProfileLayout) {
    this.props.layout = newLayout;
  }

  public updateThemeId(newThemeId: string) {
    this.props.themeId = newThemeId;
  }

  /**
   * Reorder the user's links according to the provided array of IDs.
   * The new order must contain exactly the same IDs as the current links.
   * @param newOrder Array of link IDs in the desired order.
   * @returns A Result indicating success or error.
   */
  public reorderLinks(newOrder: string[]): Result<void> {
    const currentLinks = this.props.links;
    if (!currentLinks || currentLinks.length !== newOrder.length) {
      return Result.fail<void>(
        'The number of elements in the new order does not match the number of existing links.'
      );
    }

    const linksMap = new Map(
      currentLinks.map((link) => [link.id.toString(), link])
    );

    for (const linkId of newOrder) {
      if (!linksMap.has(linkId)) {
        return Result.fail<void>(
          `The link with id ${linkId} does not belong to the user.`
        );
      }
    }

    newOrder.forEach((linkId, index) => {
      const link = linksMap.get(linkId)!;
      link.updatePosition(index + 1);
    });

    return Result.ok<void>();
  }

  public addLink(link: Link) {
    if (!this.props.links) {
      this.props.links = [];
    }

    this.props.links.push(link);
  }

  public removeLink(linkId: string) {
    if (!this.props.links) {
      return;
    }

    const index = this.props.links.findIndex(
      (link) => link.id.toString() === linkId
    );

    if (index !== -1) {
      this.props.links.splice(index, 1);
    }
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      email: this.props.email,
      username: this.props.username,
      image: this.props.image,
      bio: this.props.bio,
      layout: this.props.layout,
      themeId: this.props.themeId,
      links: this.props.links?.map((link) => link.toJSON()),
    };
  }
}
