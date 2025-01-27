import { injectable, inject } from 'inversify';
import { PageView } from '@/@core/domain/entities/PageView';
import { RegisterPageViewDTO } from './RegisterPageViewDTO';
import type { IPageViewRepository } from '@/@core/domain/repositories/IPageViewRepository';
import { UserId } from '@/@core/domain/value-objects/UserId';
import { IP } from '@/@core/domain/value-objects/Ip';
import { UserAgent } from '@/@core/domain/value-objects/UserAgent';

@injectable()
export class RegisterPageViewUseCase {
  constructor(
    @inject('IPageViewRepository')
    private pageViewRepository: IPageViewRepository
  ) {}

  async execute(data: RegisterPageViewDTO): Promise<PageView> {
    const userId = UserId.create(data.userId);
    const ip = IP.create(data.ip);
    const userAgent = UserAgent.create(data.userAgent);

    const pageView = new PageView({
      userId,
      ip,
      city: data.city,
      region: data.region,
      country: data.country,
      userAgent,
      os: data.os,
      browser: data.browser,
      screen: data.screen,
      viewedAt: new Date(),
    });

    const createdPageView =
      await this.pageViewRepository.createPageView(pageView);

    return createdPageView;
  }
}
