import { inject, injectable } from 'inversify';
import { GetUserLifetimeMetricsResponse } from './GetUserLifetimeMetricsResponse';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { TYPES } from '@core/infrastructure/constants/types';

@injectable()
export class GetUserLifetimeMetricsUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<GetUserLifetimeMetricsResponse> {
    const metrics = await this.userRepository.getLifetimeMetrics(userId);

    return {
      views: metrics.views,
      clicks: metrics.clicks,
      clickRate: metrics.clickRate,
    };
  }
}
