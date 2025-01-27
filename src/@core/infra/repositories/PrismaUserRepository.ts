import { injectable } from 'inversify';
import { User } from '@/@core/domain/entities/User';
import { IUserRepository } from '@/@core/domain/repositories/IUserRepository';
import { UserMapper } from '@/@core/infra/mappers/UserMapper';
import { prisma } from '@/@core/infra/prisma';

@injectable()
export class PrismaUserRepository implements IUserRepository {
  async findUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async createUser(user: User): Promise<User> {
    const persistenceUser = UserMapper.toPersistence(user);
    const createdUser = await prisma.user.create({
      data: persistenceUser,
    });

    return UserMapper.toDomain(createdUser);
  }

  async updateUser(user: User): Promise<User> {
    const persistenceUser = UserMapper.toPersistence(user);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: persistenceUser,
    });

    return UserMapper.toDomain(updatedUser);
  }

  async deleteUser(user: User): Promise<void> {
    await prisma.user.delete({
      where: { id: user.id },
    });
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
