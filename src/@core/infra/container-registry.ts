import 'reflect-metadata';

import { Container } from 'inversify';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';

import { ILinkRepository } from '../domain/repositories/ILinkRepository';
import { PrismaLinkRepository } from './repositories/PrismaLinkRepository';

import { GetUserLinkListUseCase } from '../application/useCases/GetUserLinkList/GetUserLinkListUseCase';
import { GetPublicProfileByUsernameUseCase } from '../application/useCases/GetPublicProfileByUsername/GetPublicProfileByUsernameUseCase';
import { AddLinkUseCase } from '../application/useCases/AddLink/AddLinkUseCase';
import { UpdateLinkUseCase } from '../application/useCases/UpdateLink/UpdateLinkUseCase';
import { RemoveLinkUseCase } from '../application/useCases/RemoveLink/RemoveLinkUseCase';
import { ArchiveLinkUseCase } from '../application/useCases/ArchiveLink/ArchiveLinkUseCase';
import { RestoreLinkUseCase } from '../application/useCases/RestoreLink/RestoreLinkUseCase';
import { ReorderLinksUseCase } from '../application/useCases/ReorderLinks/ReorderLinksUseCase';
import { UploadFilesUseCase } from '../application/useCases/uploadFiles/UploadFilesUseCase';

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

// Link interfaces to implementations
container
  .bind<IUserRepository>('IUserRepository')
  .to(PrismaUserRepository)
  .inSingletonScope();
container
  .bind<ILinkRepository>('ILinkRepository')
  .to(PrismaLinkRepository)
  .inSingletonScope();

// Services
container.bind('FileUploaderService').to(MinioFileUploader).inSingletonScope();

export { container };
