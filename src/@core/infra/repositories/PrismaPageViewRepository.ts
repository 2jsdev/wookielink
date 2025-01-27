import { injectable } from 'inversify';
import { IPageViewRepository } from '@/@core/domain/repositories/IPageViewRepository';
import { PageView } from '@/@core/domain/entities/PageView';
import { PageViewMapper } from '@/@core/infra/mappers/PageViewMapper';
import { prisma } from '@/@core/infra/prisma';

@injectable()
export class PrismaPageViewRepository implements IPageViewRepository {
  async createPageView(pageView: PageView): Promise<PageView> {
    const persistencePageView = PageViewMapper.toPersistence(pageView);

    const createdPageView = await prisma.pageView.create({
      data: persistencePageView,
    });

    return PageViewMapper.toDomain(createdPageView);
  }

  async findPageViewsByUserId(userId: string): Promise<PageView[]> {
    const pageViews = await prisma.pageView.findMany({
      where: { userId },
      orderBy: { viewedAt: 'desc' },
    });

    return pageViews.map(PageViewMapper.toDomain);
  }

  async findPageViewsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PageView[]> {
    const pageViews = await prisma.pageView.findMany({
      where: {
        userId,
        viewedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { viewedAt: 'desc' },
    });

    return pageViews.map(PageViewMapper.toDomain);
  }

  async getTotalPageViews(userId: string): Promise<number> {
    const totalPageViews = await prisma.pageView.count({
      where: { userId },
    });

    return totalPageViews;
  }
}
