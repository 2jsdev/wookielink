import 'reflect-metadata';

import { Container } from 'inversify';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';

import { ILinkRepository } from '../domain/repositories/ILinkRepository';
import { PrismaLinkRepository } from './repositories/PrismaLinkRepository';

import { IPageViewRepository } from '../domain/repositories/IPageViewRepository';
import { PrismaPageViewRepository } from './repositories/PrismaPageViewRepository';

import { ILinkInteractionRepository } from '../domain/repositories/ILinkInteractionRepository';
import { PrismaLinkInteractionRepository } from './repositories/PrismaLinkInteractionRepository';

import { GetUserLinkListUseCase } from '../application/useCases/GetUserLinkList/GetUserLinkListUseCase';
import { GetPublicProfileByUsernameUseCase } from '../application/useCases/GetPublicProfileByUsername/GetPublicProfileByUsernameUseCase';
import { AddLinkUseCase } from '../application/useCases/AddLink/AddLinkUseCase';
import { UpdateLinkUseCase } from '../application/useCases/UpdateLink/UpdateLinkUseCase';
import { RemoveLinkUseCase } from '../application/useCases/RemoveLink/RemoveLinkUseCase';
import { ArchiveLinkUseCase } from '../application/useCases/ArchiveLink/ArchiveLinkUseCase';
import { RestoreLinkUseCase } from '../application/useCases/RestoreLink/RestoreLinkUseCase';
import { ReorderLinksUseCase } from '../application/useCases/ReorderLinks/ReorderLinksUseCase';
import { UploadFilesUseCase } from '../application/useCases/uploadFiles/UploadFilesUseCase';
import { UploadUserProfilePhotoUseCase } from '../application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoUseCase';
import { DeleteUserProfilePhotoUseCase } from '../application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoUseCase';
import { RegisterPageViewUseCase } from '../application/useCases/RegisterPageView/RegisterPageViewUseCase';
import { RegisterLinkClickUseCase } from '../application/useCases/RegisterLinkClick/RegisterLinkClickUseCase';
import { GetPageViewsByUserUseCase } from '../application/useCases/GetPageViewsByUser/GetPageViewsByUserUseCase';
import { GetPageViewsByDateRangeUseCase } from '../application/useCases/GetPageViewsByDateRange/GetPageViewsByDateRangeUseCase';
import { GetTotalPageViewsUseCase } from '../application/useCases/GetTotalPageViews/GetTotalPageViewsUseCase';
import { GetUserLifetimeMetricsUseCase } from '../application/useCases/GetUserLifetimeMetrics/GetUserLifetimeMetricsUseCase';

import { CheckUsernameAvailabilityUseCase } from '../application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityUseCase';
import { UpdateUserProfileUseCase } from '../application/useCases/UpdateUserProfile/UpdateUserProfileUseCase';
import { ViewUserProfileUseCase } from '../application/useCases/ViewUserProfile/ViewUserProfileUseCase';

import { MinioFileUploader } from './services/MinioFileUploader';

const container = new Container();

// Use cases
container
  .bind<GetUserLinkListUseCase>('GetUserLinkListUseCase')
  .to(GetUserLinkListUseCase);
container
  .bind<GetPublicProfileByUsernameUseCase>('GetPublicProfileByUsernameUseCase')
  .to(GetPublicProfileByUsernameUseCase);

container.bind<AddLinkUseCase>('AddLinkUseCase').to(AddLinkUseCase);
container.bind<UpdateLinkUseCase>('UpdateLinkUseCase').to(UpdateLinkUseCase);
container.bind<RemoveLinkUseCase>('RemoveLinkUseCase').to(RemoveLinkUseCase);
container.bind<ArchiveLinkUseCase>('ArchiveLinkUseCase').to(ArchiveLinkUseCase);
container.bind<RestoreLinkUseCase>('RestoreLinkUseCase').to(RestoreLinkUseCase);
container
  .bind<ReorderLinksUseCase>('ReorderLinksUseCase')
  .to(ReorderLinksUseCase);
container
  .bind<CheckUsernameAvailabilityUseCase>('CheckUsernameAvailabilityUseCase')
  .to(CheckUsernameAvailabilityUseCase);
container
  .bind<UpdateUserProfileUseCase>('UpdateUserProfileUseCase')
  .to(UpdateUserProfileUseCase);
container
  .bind<ViewUserProfileUseCase>('ViewUserProfileUseCase')
  .to(ViewUserProfileUseCase);
container.bind<UploadFilesUseCase>('UploadFilesUseCase').to(UploadFilesUseCase);
container
  .bind<UploadUserProfilePhotoUseCase>('UploadUserProfilePhotoUseCase')
  .to(UploadUserProfilePhotoUseCase);
container
  .bind<DeleteUserProfilePhotoUseCase>('DeleteUserProfilePhotoUseCase')
  .to(DeleteUserProfilePhotoUseCase);
container
  .bind<RegisterPageViewUseCase>('RegisterPageViewUseCase')
  .to(RegisterPageViewUseCase);
container
  .bind<RegisterLinkClickUseCase>('RegisterLinkClickUseCase')
  .to(RegisterLinkClickUseCase);
container
  .bind<GetPageViewsByUserUseCase>('GetPageViewsByUserUseCase')
  .to(GetPageViewsByUserUseCase);
container
  .bind<GetPageViewsByDateRangeUseCase>('GetPageViewsByDateRangeUseCase')
  .to(GetPageViewsByDateRangeUseCase);
container
  .bind<GetTotalPageViewsUseCase>('GetTotalPageViewsUseCase')
  .to(GetTotalPageViewsUseCase);
container
  .bind<GetUserLifetimeMetricsUseCase>('GetUserLifetimeMetricsUseCase')
  .to(GetUserLifetimeMetricsUseCase);

// Link interfaces to implementations
container
  .bind<IUserRepository>('IUserRepository')
  .to(PrismaUserRepository)
  .inSingletonScope();
container
  .bind<ILinkRepository>('ILinkRepository')
  .to(PrismaLinkRepository)
  .inSingletonScope();
container
  .bind<IPageViewRepository>('IPageViewRepository')
  .to(PrismaPageViewRepository)
  .inSingletonScope();
container
  .bind<ILinkInteractionRepository>('ILinkInteractionRepository')
  .to(PrismaLinkInteractionRepository)
  .inSingletonScope();

// Services
container.bind('FileUploaderService').to(MinioFileUploader).inSingletonScope();

export { container };
