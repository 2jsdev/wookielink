import { Entity } from '@core/shared/domain/Entity';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export interface BackgroundProps {
  type: BackgroundType;
  style?: BackgroundStyleType;
  color: string;
  imageUrl?: string;
  videoUrl?: string;
}

export const backgroundTypes = {
  COLOR: 'COLOR',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  ANIMATED: 'ANIMATED',
} as const;

export type BackgroundType = keyof typeof backgroundTypes;

export const backgroundStyles = {
  FLAT: 'FLAT',
  COLORUP: 'COLORUP',
  COLORDOWN: 'COLORDOWN',
  POLKA: 'POLKA',
  STRIPE: 'STRIPE',
  WAVES: 'WAVES',
  ZIGZAG: 'ZIGZAG',
} as const;

export type BackgroundStyleType = keyof typeof backgroundStyles;

export class Background extends Entity<BackgroundProps> {
  private constructor(props: BackgroundProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: BackgroundProps,
    id?: UniqueEntityID
  ): Background {
    return new Background(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  get type(): BackgroundType {
    return this.props.type;
  }
  get style(): BackgroundStyleType | undefined {
    return this.props.style;
  }
  get color(): string {
    return this.props.color;
  }
  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }
  get videoUrl(): string | undefined {
    return this.props.videoUrl;
  }

  public toJSON() {
    return {
      id: this._id.toString(),
      type: this.props.type,
      style: this.props.style,
      color: this.props.color,
      imageUrl: this.props.imageUrl,
      videoUrl: this.props.videoUrl,
    };
  }
}
