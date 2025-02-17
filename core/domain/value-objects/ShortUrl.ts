import { ValueObject } from '@core/shared/domain/ValueObject';
import { nanoid } from 'nanoid';

interface ShortUrlProps {
  value: string;
}

export class ShortUrl extends ValueObject<ShortUrlProps> {
  private static readonly BASE_URL =
    `${process.env.SHORT_URL_BASE}` || 'http://localhost:3000/s/';

  private constructor(props: ShortUrlProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get fullUrl(): string {
    return `${ShortUrl.BASE_URL}${this.props.value}`;
  }

  public static create(existingShortCode?: string): ShortUrl {
    if (existingShortCode) {
      return new ShortUrl({
        value: existingShortCode.replace(ShortUrl.BASE_URL, '').trim(),
      });
    }

    const newSlug = nanoid(8);
    return new ShortUrl({ value: newSlug });
  }
}
