import { injectable, inject } from 'inversify';
import { GetPageViewsByUserDTO } from './GetPageViewsByUserDTO';
import { PageView } from '@/@core/domain/entities/PageView';
import type { IPageViewRepository } from '@/@core/domain/repositories/IPageViewRepository';
import { UserId } from '@/@core/domain/value-objects/UserId';

@injectable()
export class GetPageViewsByUserUseCase {
  constructor(
    @inject('IPageViewRepository')
    private pageViewRepository: IPageViewRepository
  ) {}

  async execute(data: GetPageViewsByUserDTO): Promise<PageView[]> {
    const userId = UserId.create(data.userId);

    const pageViews = await this.pageViewRepository.findPageViewsByUserId(
      userId.getValue()
    );

    if (!pageViews || pageViews.length === 0) {
      return [];
    }

    return pageViews;
  }
}
