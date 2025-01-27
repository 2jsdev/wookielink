import { inject, injectable } from 'inversify';
import type { IUserRepository } from '@/@core/domain/repositories/IUserRepository';
import { UserId } from '@/@core/domain/value-objects/UserId';
import { GetUserLifetimeMetricsResponse } from './GetUserLifetimeMetricsResponse';

@injectable()
export class GetUserLifetimeMetricsUseCase {
  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<GetUserLifetimeMetricsResponse> {
    const userIdValue = UserId.create(userId);

    const metrics = await this.userRepository.getLifetimeMetrics(
      userIdValue.getValue()
    );

    return {
      views: metrics.views,
      clicks: metrics.clicks,
      clickRate: metrics.clickRate,
    };
  }
}
