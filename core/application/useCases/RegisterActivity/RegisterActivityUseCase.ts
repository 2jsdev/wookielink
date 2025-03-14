import { inject, injectable } from 'inversify';
import { TYPES } from '@core/infrastructure/constants/types';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { IActivityRepository } from '@core/domain/repositories/IActivityRepository';
import { Activity } from '@core/domain/entities/Activity';
import { RegisterActivityDTO } from '@core/application/useCases/RegisterActivity/RegisterActivityDTO';
import { RegisterActivityResponse } from '@core/application/useCases/RegisterActivity/RegisterActivityResponse';
import { RegisterActivityErrors } from '@core/application/useCases/RegisterActivity/RegisterActivityErrors';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

@injectable()
export class RegisterActivityUseCase {
  constructor(
    @inject(TYPES.ActivityRepository)
    private activityRepository: IActivityRepository
  ) {}

  async execute(
    request: RegisterActivityDTO
  ): Promise<RegisterActivityResponse> {
    try {
      const TIMEFRAME_SECONDS = 3600;

      const recentActivity =
        await this.activityRepository.findRecentActivityByIp(
          request.ip,
          request.linkId,
          request.type,
          TIMEFRAME_SECONDS
        );

      if (recentActivity) {
        return left(new RegisterActivityErrors.DuplicateActivityError());
      }

      const activityOrError = Activity.create(request, new UniqueEntityID());

      if (activityOrError.isFailure) {
        return left(new RegisterActivityErrors.InvalidActivityDataError());
      }

      const newActivity = activityOrError.getValue();
      const savedActivity = await this.activityRepository.create(newActivity);

      return right(Result.ok(savedActivity));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
