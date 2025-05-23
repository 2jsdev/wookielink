import { injectable } from 'inversify';
import { User } from '@core/domain/entities/User';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { prisma } from '@core/shared/infrastructure/persistence/prisma';
import { UserMapper } from '@core/infrastructure/mappers/UserMapper';

@injectable()
export class UserRepository implements IUserRepository {
  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          links: {
            where: {
              active: true,
              archived: false,
            },
            orderBy: {
              position: 'asc',
            },
          },
          theme: {
            include: {
              background: true,
              buttonStyle: true,
              fontStyle: true,
            },
          },
        },
      });

      return user ? UserMapper.toDomain(user) : null;
    } catch (error) {
      console.error(
        `Error in findUserByUsername (username: ${username}):`,
        error
      );
      throw error;
    }
  }

  async findUserById(userId: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user ? UserMapper.toDomain(user) : null;
    } catch (error) {
      console.error(`Error in findUserById (userId: ${userId}):`, error);
      throw error;
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const persistenceUser = UserMapper.toPersistence(user);
      const updatedUser = await prisma.user.update({
        where: { id: user.id.toString() },
        data: persistenceUser,
      });

      const domainUser = UserMapper.toDomain(updatedUser);

      return domainUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async getLifetimeMetrics(
    userId: string
  ): Promise<{ views: number; clicks: number; clickRate: number }> {
    try {
      const metrics = await prisma.userMetrics.findUnique({
        where: { userId },
      });

      if (!metrics) {
        return { views: 0, clicks: 0, clickRate: 0 };
      }

      return {
        views: metrics.views,
        clicks: metrics.clicks,
        clickRate: metrics.clickRate ?? 0,
      };
    } catch (error) {
      console.error(error);
      return { views: 0, clicks: 0, clickRate: 0 };
    }
  }
}
