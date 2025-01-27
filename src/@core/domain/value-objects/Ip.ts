export class IP {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid IP address format');
    }
  }

  private isValid(ip: string): boolean {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  public static create(ip: string): IP {
    return new IP(ip);
  }

  public getValue(): string {
    return this.value;
  }
}
