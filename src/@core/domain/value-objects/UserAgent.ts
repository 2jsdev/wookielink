export class UserAgent {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('User agent must not be empty');
    }
  }

  private isValid(userAgent: string): boolean {
    return userAgent.trim().length > 0;
  }

  public static create(userAgent: string): UserAgent {
    return new UserAgent(userAgent);
  }

  public getValue(): string {
    return this.value;
  }
}
