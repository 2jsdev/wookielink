import { injectable, inject } from 'inversify';
import { GetPageViewsByDateRangeDTO } from './GetPageViewsByDateRangeDTO';
import { PageView } from '@/@core/domain/entities/PageView';
import type { IPageViewRepository } from '@/@core/domain/repositories/IPageViewRepository';
import { UserId } from '@/@core/domain/value-objects/UserId';

@injectable()
export class GetPageViewsByDateRangeUseCase {
  constructor(
    @inject('IPageViewRepository')
    private pageViewRepository: IPageViewRepository
  ) {}

  async execute(data: GetPageViewsByDateRangeDTO): Promise<PageView[]> {
    const userId = UserId.create(data.userId);

    const pageViews = await this.pageViewRepository.findPageViewsByDateRange(
      userId.getValue(),
      data.startDate,
      data.endDate
    );

    if (!pageViews || pageViews.length === 0) {
      return [];
    }

    return pageViews;
  }
}
