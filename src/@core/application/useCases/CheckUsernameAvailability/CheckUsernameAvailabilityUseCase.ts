import { inject, injectable } from 'inversify';
import type { IUserRepository } from '@/@core/domain/repositories/IUserRepository';
import { CheckUsernameAvailabilityDTO } from './CheckUsernameAvailabilityDTO';
import { ValidationError } from '@/@core/domain/errors/ValidationError';

@injectable()
export class CheckUsernameAvailabilityUseCase {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(data: CheckUsernameAvailabilityDTO): Promise<boolean> {
    const existingUser = await this.userRepository.findUserByUsername(
      data.username
    );

    return !existingUser;
  }
}
