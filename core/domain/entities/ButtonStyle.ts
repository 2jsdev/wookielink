import { Entity } from '@core/shared/domain/Entity';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

export interface ButtonStyleProps {
  type: ButtonType;
  backgroundColor: string;
  shadowColor: string;
  textColor: string;
}

export const buttonTypes = {
  FILL: 'FILL',
  FILL_ROUNDED: 'FILL_ROUNDED',
  FILL_CIRCULAR: 'FILL_CIRCULAR',
  OUTLINE: 'OUTLINE',
  OUTLINE_ROUNDED: 'OUTLINE_ROUNDED',
  OUTLINE_CIRCULAR: 'OUTLINE_CIRCULAR',
  SOFTSHADOW: 'SOFTSHADOW',
  SOFTSHADOW_ROUNDED: 'SOFTSHADOW_ROUNDED',
  SOFTSHADOW_CIRCULAR: 'SOFTSHADOW_CIRCULAR',
  HARDSHADOW: 'HARDSHADOW',
  HARDSHADOW_ROUNDED: 'HARDSHADOW_ROUNDED',
  HARDSHADOW_CIRCULAR: 'HARDSHADOW_CIRCULAR',
} as const;

export type ButtonType = keyof typeof buttonTypes;

export class ButtonStyle extends Entity<ButtonStyleProps> {
  private constructor(props: ButtonStyleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ButtonStyleProps,
    id?: UniqueEntityID
  ): ButtonStyle {
    return new ButtonStyle(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  get type(): ButtonType {
    return this.props.type;
  }
  get backgroundColor(): string {
    return this.props.backgroundColor;
  }
  get shadowColor(): string {
    return this.props.shadowColor;
  }
  get textColor(): string {
    return this.props.textColor;
  }

  public toJSON() {
    return {
      id: this._id.toString(),
      type: this.props.type,
      backgroundColor: this.props.backgroundColor,
      shadowColor: this.props.shadowColor,
      textColor: this.props.textColor,
    };
  }
}
