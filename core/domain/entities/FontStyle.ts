import { Entity } from '@core/shared/domain/Entity';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export const fonts = {
  inter: 'Inter',
  roboto: 'Roboto',
  montserrat: 'Montserrat',
  poppins: 'Poppins',
  overpass_mono: 'Overpass Mono',
} as const;

export type FontFamily = keyof typeof fonts;

export interface FontStyleProps {
  color: string;
  fontFamily: FontFamily;
}

export class FontStyle extends Entity<FontStyleProps> {
  private constructor(props: FontStyleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FontStyleProps, id?: UniqueEntityID): FontStyle {
    return new FontStyle(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  get color(): string {
    return this.props.color;
  }
  get fontFamily(): FontFamily {
    return this.props.fontFamily;
  }

  public toJSON() {
    return {
      id: this._id.toString(),
      color: this.props.color,
      fontFamily: this.props.fontFamily,
    };
  }
}
