import { User } from '@core/domain/entities/User';

export interface IUserRepository {
  findUserByUsername(username: string): Promise<User | null>;
  findUserById(userId: string): Promise<User | null>;
  updateUser(user: User): Promise<User>;
  getLifetimeMetrics(userId: string): Promise<{
    views: number;
    clicks: number;
    clickRate: number;
  }>;
}
