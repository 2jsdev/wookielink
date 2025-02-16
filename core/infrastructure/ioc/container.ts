import { Container } from 'inversify';
// Use cases
import { CheckUsernameAvailabilityUseCase } from '@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityUseCase';
import { GetPublicProfileUseCase } from '@core/application/useCases/GetPublicProfile/GetPublicProfileUseCase';
import { GetUserProfileUseCase } from '@core/application/useCases/GetUserProfile/GetUserProfileUseCase';
import { UpdateUserProfileUseCase } from '@core/application/useCases/UpdateUserProfile/UpdateUserProfileUseCase';
import { UploadUserProfilePhotoUseCase } from '@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoUseCase';

import { AddUserLinkUseCase } from '@core/application/useCases/AddUserLink/AddUserLinkUseCase';
import { UpdateUserLinkUseCase } from '@core/application/useCases/UpdateUserLink/UpdateUserLinkUseCase';
import { DeleteUserLinkUseCase } from '@core/application/useCases/DeleteUserLink/DeleteUserLinkUseCase';
import { ReorderUserLinksUseCase } from '@core/application/useCases/ReorderUserLinks/ReorderUserLinksUseCase';
import { UploadUserLinkThumbnailUseCase } from '@core/application/useCases/UploadUserLinkThumbnail/UploadUserLinkThumbnailUseCase';
import { DeleteUserLinkThumbnailUseCase } from '@core/application/useCases/DeleteUserLinkThumbnail/DeleteUserLinkThumbnailUseCase';

// Repositories
import { UserRepository } from '@core/infrastructure/persistence/UserRepository';
import { LinkRepository } from '@core/infrastructure/persistence/LinkRepository';

// Services
import { MinioFileUploader } from '@core/infrastructure/services/MinioFileUploader';
import { OpenGraphScraperService } from '@core/infrastructure/services/OpenGraphScraperService';

import { TYPES } from '@core/infrastructure/constants/types';

const container = new Container();

// Use cases
container
  .bind<CheckUsernameAvailabilityUseCase>(
    TYPES.CheckUsernameAvailabilityUseCase
  )
  .to(CheckUsernameAvailabilityUseCase);
container
  .bind<GetPublicProfileUseCase>(TYPES.GetPublicProfileUseCase)
  .to(GetPublicProfileUseCase);

container
  .bind<GetUserProfileUseCase>(TYPES.GetUserProfileUseCase)
  .to(GetUserProfileUseCase);
container
  .bind<UpdateUserProfileUseCase>(TYPES.UpdateUserProfileUseCase)
  .to(UpdateUserProfileUseCase);
container
  .bind<UploadUserProfilePhotoUseCase>(TYPES.UploadUserProfilePhotoUseCase)
  .to(UploadUserProfilePhotoUseCase);
container
  .bind<AddUserLinkUseCase>(TYPES.AddUserLinkUseCase)
  .to(AddUserLinkUseCase);
container
  .bind<UpdateUserLinkUseCase>(TYPES.UpdateUserLinkUseCase)
  .to(UpdateUserLinkUseCase);
container
  .bind<DeleteUserLinkUseCase>(TYPES.DeleteUserLinkUseCase)
  .to(DeleteUserLinkUseCase);
container
  .bind<ReorderUserLinksUseCase>(TYPES.ReorderUserLinksUseCase)
  .to(ReorderUserLinksUseCase);
container
  .bind<UploadUserLinkThumbnailUseCase>(TYPES.UploadUserLinkThumbnailUseCase)
  .to(UploadUserLinkThumbnailUseCase);

container
  .bind<DeleteUserLinkThumbnailUseCase>(TYPES.DeleteUserLinkThumbnailUseCase)
  .to(DeleteUserLinkThumbnailUseCase);

// Repositories
container.bind(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind(TYPES.LinkRepository).to(LinkRepository).inSingletonScope();

// Services
container
  .bind(TYPES.FileUploaderService)
  .to(MinioFileUploader)
  .inSingletonScope();

container
  .bind(TYPES.OpenGraphService)
  .to(OpenGraphScraperService)
  .inSingletonScope();

export { container };
