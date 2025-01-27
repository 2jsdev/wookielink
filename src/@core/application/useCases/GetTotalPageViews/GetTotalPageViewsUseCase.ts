import { injectable, inject } from 'inversify';
import { GetTotalPageViewsDTO } from './GetTotalPageViewsDTO';
import type { IPageViewRepository } from '@/@core/domain/repositories/IPageViewRepository';
import { UserId } from '@/@core/domain/value-objects/UserId';

@injectable()
export class GetTotalPageViewsUseCase {
  constructor(
    @inject('IPageViewRepository')
    private pageViewRepository: IPageViewRepository
  ) {}

  async execute(
    data: GetTotalPageViewsDTO
  ): Promise<{ totalPageViews: number }> {
    const userId = UserId.create(data.userId);

    const totalPageViews = await this.pageViewRepository.getTotalPageViews(
      userId.getValue()
    );

    return { totalPageViews };
  }
}
