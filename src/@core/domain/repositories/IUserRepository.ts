import { User } from '../entities/User';

export interface IUserRepository {
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(user: User): Promise<void>;
  getLifetimeMetrics(userId: string): Promise<{
    views: number;
    clicks: number;
    clickRate: number;
  }>;
}
