import { Guard } from '@core/shared/core/Guard';
import { Result } from '@core/shared/core/Result';
import { AggregateRoot } from '@core/shared/domain/AggregateRoot';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { Link } from './Link';
import { Theme } from './Theme';

export enum ProfileLayout {
  Classic = 'Classic',
  Hero = 'Hero',
}

export interface UserProps {
  name: string;
  email: string;
  username?: string;
  image?: string | null;
  imagePreview?: string | null;
  imagePreviewBgColor?: string | null;
  bio?: string;
  layout?: ProfileLayout;
  themeId?: string;
  links?: Link[];
  theme?: Theme;
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

  public get imagePreview() {
    return this.props.imagePreview;
  }

  public get imagePreviewBgColor() {
    return this.props.imagePreviewBgColor;
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

  public get theme() {
    return this.props.theme;
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

  public updateImagePreview(newImagePreview: string) {
    this.props.imagePreview = newImagePreview;
  }

  public deleteImagePreview() {
    this.props.imagePreview = null;
  }

  public updateImagePreviewBgColor(newImagePreviewBgColor: string) {
    this.props.imagePreviewBgColor = newImagePreviewBgColor;
  }

  public deleteImagePreviewBgColor() {
    this.props.imagePreviewBgColor = null;
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

  public updateTheme(theme: Theme) {
    this.props.theme = theme;
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      email: this.props.email,
      username: this.props.username,
      image: this.props.image,
      imagePreview: this.props.imagePreview,
      imagePreviewBgColor: this.props.imagePreviewBgColor,
      bio: this.props.bio,
      layout: this.props.layout,
      themeId: this.props.themeId,
      links: this.props.links?.map((link) => link.toJSON()),
      theme: this.props.theme?.toJSON(),
    };
  }
}
