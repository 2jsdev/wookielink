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

  async getMetricsByLocation(userId: string): Promise<
    {
      country: string;
      city: string;
      views: number;
      clicks: number;
    }[]
  > {
    try {
      return prisma.$queryRaw`
        SELECT 
          country, 
          city,
          COUNT(*) FILTER (WHERE type = 'View') AS views,
          COUNT(*) FILTER (WHERE type = 'Click') AS clicks
        FROM activities
        WHERE user_id = ${userId}
        GROUP BY country, city
      `;
    } catch (error) {
      console.error(
        `Error in getMetricsByLocation (userId: ${userId}):`,
        error
      );
      throw error;
    }
  }

  async getMetricsByDevice(userId: string): Promise<
    {
      device: string;
      views: number;
      clicks: number;
    }[]
  > {
    try {
      return prisma.$queryRaw`
        SELECT 
          os AS device,
          COUNT(*) FILTER (WHERE type = 'View') AS views,
          COUNT(*) FILTER (WHERE type = 'Click') AS clicks
        FROM activities
        WHERE user_id = ${userId}
        GROUP BY os
      `;
    } catch (error) {
      console.error(`Error in getMetricsByDevice (userId: ${userId}):`, error);
      throw error;
    }
  }
}
