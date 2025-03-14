import { injectable } from 'inversify';
import { prisma } from '@core/shared/infrastructure/persistence/prisma';
import { Activity, ActivityType } from '@core/domain/entities/Activity';
import { IActivityRepository } from '@core/domain/repositories/IActivityRepository';
import { ActivityMapper } from '@core/infrastructure/mappers/ActivityMapper';

@injectable()
export class ActivityRepository implements IActivityRepository {
  async create(activity: Activity): Promise<Activity> {
    try {
      const persistenceActivity = ActivityMapper.toPersistence(activity);
      const createdActivity = await prisma.activity.create({
        data: persistenceActivity,
      });

      return ActivityMapper.toDomain(createdActivity);
    } catch (error) {
      console.error('Error in create activity:', error);
      throw error;
    }
  }

  async findRecentActivityByIp(
    ip: string,
    linkId: string,
    type: ActivityType,
    timeframeSeconds: number
  ): Promise<Activity | null> {
    const recentActivity = await prisma.activity.findFirst({
      where: {
        ip,
        linkId,
        type,
        timestamp: {
          gte: new Date(Date.now() - timeframeSeconds * 1000),
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return recentActivity ? ActivityMapper.toDomain(recentActivity) : null;
  }
}
