import { Email } from '../value-objects/Email';
import { UserId } from '../value-objects/UserId';
import { Link } from './Link';

export type UserProps = {
  id?: UserId;
  name?: string;
  email: Email;
  username?: string;
  image?: string | null;
  links?: Link[];
};

export class User {
  constructor(public props: UserProps) {
    this.validateProps(props);
  }

  private validateProps(props: UserProps): void {
    if (!props.id) {
      this.props.id = UserId.create();
    }

    if (!props.email) {
      throw new Error('Email is required.');
    }

    if (props.username && props.username.trim() === '') {
      throw new Error('Username cannot be empty.');
    }

    if (props.links && props.links.length > 0) {
      for (const link of props.links) {
        if (!(link instanceof Link)) {
          throw new Error('All links must be valid Link instances.');
        }
      }
    }

    if (!props.id) {
      this.props.id = UserId.create();
    }
  }

  get id() {
    return this.props.id?.getValue();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email.getValue();
  }

  get username() {
    return this.props.username;
  }

  get image() {
    return this.props.image;
  }

  get links() {
    return this.props.links;
  }

  public updateImage(image: string) {
    this.props.image = image;
  }

  public deleteImage() {
    this.props.image = null;
  }

  public static create(props: UserProps): User {
    return new User(props);
  }

  public toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      image: this.image,
      links: this.links?.map((link) => link.toPlainObject()),
    };
  }
}
