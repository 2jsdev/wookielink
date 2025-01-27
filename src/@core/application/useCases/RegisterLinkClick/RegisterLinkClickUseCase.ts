import { injectable, inject } from 'inversify';
import { PageView } from '@/@core/domain/entities/PageView';
import { RegisterLinkClickDTO } from './RegisterLinkClickDTO';
import type { ILinkInteractionRepository } from '@/@core/domain/repositories/ILinkInteractionRepository';
import { LinkId } from '@/@core/domain/value-objects/LinkId';
import { UserId } from '@/@core/domain/value-objects/UserId';
import { IP } from '@/@core/domain/value-objects/Ip';
import { UserAgent } from '@/@core/domain/value-objects/UserAgent';
import { LinkInteraction } from '@/@core/domain/entities/LinkInteraction';

@injectable()
export class RegisterLinkClickUseCase {
  constructor(
    @inject('ILinkInteractionRepository')
    private linkInteractionRepository: ILinkInteractionRepository
  ) {}

  async execute(data: RegisterLinkClickDTO): Promise<LinkInteraction> {
    const linkId = LinkId.create(data.linkId);
    const userId = UserId.create(data.userId);
    const ip = IP.create(data.ip);
    const userAgent = UserAgent.create(data.userAgent);

    const linkInteraction = new LinkInteraction({
      linkId,
      userId,
      ip,
      city: data.city,
      region: data.region,
      country: data.country,
      userAgent,
      os: data.os,
      browser: data.browser,
      screen: data.screen,
      interactedAt: new Date(),
    });

    const createdPageView =
      await this.linkInteractionRepository.createLinkInteraction(
        linkInteraction
      );

    return createdPageView;
  }
}
