import { PageView } from '../entities/PageView';

export interface IPageViewRepository {
  createPageView(pageView: PageView): Promise<PageView>;
  findPageViewsByUserId(userId: string): Promise<PageView[]>;
  findPageViewsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PageView[]>;
  getTotalPageViews(userId: string): Promise<number>;
}
