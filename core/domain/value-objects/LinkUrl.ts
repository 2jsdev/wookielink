import { ValueObject } from '@core/shared/domain/ValueObject';

interface LinkUrlProps {
  value: string;
}

export class LinkUrl extends ValueObject<LinkUrlProps> {
  private constructor(props: LinkUrlProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(url: string): LinkUrl {
    if (!url) {
      return new LinkUrl({ value: '' });
    }

    const isUrlValid = LinkUrl.isValidUrl(url);

    if (!isUrlValid) {
      return new LinkUrl({ value: '' });
    }

    return new LinkUrl({ value: url });
  }

  private static isValidUrl(url: string): boolean {
    let urlToTest = url.trim();

    if (!/^https?:\/\//i.test(urlToTest)) {
      urlToTest = 'http://' + urlToTest;
    }

    try {
      const parsedUrl = new URL(urlToTest);

      const hostnameParts = parsedUrl.hostname.split('.');
      if (hostnameParts.length < 2) {
        return false;
      }

      const tld = hostnameParts[hostnameParts.length - 1];
      if (tld.length < 2) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}
