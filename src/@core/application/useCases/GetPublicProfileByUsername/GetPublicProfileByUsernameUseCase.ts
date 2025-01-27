import { inject, injectable } from 'inversify';
import type { IUserRepository } from '@/@core/domain/repositories/IUserRepository';
import type { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import {
  GetPublicProfileByUsernameDTO,
  PublicProfileResponseDTO,
} from './GetPublicProfileByUsernameUseCaseDTO';
import { UserId } from '@/@core/domain/value-objects/UserId';

@injectable()
export class GetPublicProfileByUsernameUseCase {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository,
    @inject('ILinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(
    data: GetPublicProfileByUsernameDTO
  ): Promise<PublicProfileResponseDTO> {
    const user = await this.userRepository.findUserByUsername(data.username);

    if (!user) {
      throw new ValidationError('User not found.');
    }

    const userId = UserId.create(user.id);

    const links = await this.linkRepository.findLinksByUserId(
      userId.getValue()
    );

    const visibleLinks = links.filter((link) => !link.archived && link.visible);

    const linkDTOs = visibleLinks.map((link) => ({
      id: link.id || '',
      label: link.label,
      url: link.url,
      visible: link.visible,
      order: link.order,
    }));

    const response: PublicProfileResponseDTO = {
      id: userId.getValue(),
      username: user.username!,
      name: user.name!,
      image: user.image!,
      links: linkDTOs,
    };

    return response;
  }
}
