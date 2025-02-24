import { AggregateRoot } from '@core/shared/domain/AggregateRoot';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';
import { Result } from '@core/shared/core/Result';
import { Guard } from '@core/shared/core/Guard';
import { Background } from './Background';
import { ButtonStyle } from './ButtonStyle';
import { FontStyle } from './FontStyle';

export interface ThemeProps {
  name: string;
  premium: boolean;
  isCustom: boolean;
  ownerId?: string;
  background: Background;
  buttonStyle: ButtonStyle;
  fontStyle: FontStyle;
}

export class Theme extends AggregateRoot<ThemeProps> {
  private constructor(props: ThemeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ThemeProps, id?: UniqueEntityID): Result<Theme> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.background, argumentName: 'background' },
      { argument: props.buttonStyle, argumentName: 'buttonStyle' },
      { argument: props.fontStyle, argumentName: 'fontStyle' },
    ]);
    if (guardResult.isFailure) {
      return Result.fail<Theme>(guardResult.getErrorValue());
    }

    const theme = new Theme(
      {
        ...props,
        isCustom: props.isCustom || false,
      },
      id
    );

    return Result.ok<Theme>(theme);
  }

  get name(): string {
    return this.props.name;
  }
  get premium(): boolean {
    return this.props.premium;
  }
  get isCustom(): boolean {
    return this.props.isCustom;
  }
  get ownerId(): string | undefined {
    return this.props.ownerId;
  }
  get background(): Background {
    return this.props.background;
  }
  get buttonStyle(): ButtonStyle {
    return this.props.buttonStyle;
  }
  get fontStyle(): FontStyle {
    return this.props.fontStyle;
  }

  public updateName(newName: string): void {
    this.props.name = newName;
  }

  public updateBackground(newBackground: Background): void {
    this.props.background = newBackground;
  }

  public updateButtonStyle(newButtonStyle: ButtonStyle): void {
    this.props.buttonStyle = newButtonStyle;
  }

  public updateFontStyle(newFontStyle: FontStyle): void {
    this.props.fontStyle = newFontStyle;
  }

  public updateOwner(newOwnerId: string): void {
    this.props.ownerId = newOwnerId;
  }

  public updatePremium(newPremium: boolean): void {
    this.props.premium = newPremium;
  }

  public updateIsCustom(newIsCustom: boolean): void {
    this.props.isCustom = newIsCustom;
  }

  public toJSON() {
    return {
      id: this._id.toString(),
      name: this.props.name,
      premium: this.props.premium,
      isCustom: this.props.isCustom,
      ownerId: this.props.ownerId,
      background: this.props.background.toJSON(),
      buttonStyle: this.props.buttonStyle.toJSON(),
      fontStyle: this.props.fontStyle.toJSON(),
    };
  }
}
