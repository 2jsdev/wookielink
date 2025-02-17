export const TYPES = {
  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  LinkRepository: Symbol.for('LinkRepository'),

  // Use cases
  CheckUsernameAvailabilityUseCase: Symbol.for(
    'CheckUsernameAvailabilityUseCase'
  ),
  GetUserProfileUseCase: Symbol.for('GetUserProfileUseCase'),
  UpdateUserProfileUseCase: Symbol.for('UpdateUserProfileUseCase'),
  UploadUserProfilePhotoUseCase: Symbol.for('UploadUserProfilePhotoUseCase'),

  AddUserLinkUseCase: Symbol.for('AddUserLinkUseCase'),
  UpdateUserLinkUseCase: Symbol.for('UpdateUserLinkUseCase'),
  DeleteUserLinkUseCase: Symbol.for('DeleteUserLinkUseCase'),
  ReorderUserLinksUseCase: Symbol.for('ReorderUserLinksUseCase'),
  UploadUserLinkThumbnailUseCase: Symbol.for('UploadUserLinkThumbnailUseCase'),
  DeleteUserLinkThumbnailUseCase: Symbol.for('DeleteUserLinkThumbnailUseCase'),
  GetUsernameByShortCodeUseCase: Symbol.for('GetUsernameByShortCodeUseCase'),

  GetPublicProfileUseCase: Symbol.for('GetPublicProfileUseCase'),

  // Services
  FileUploaderService: Symbol.for('FileUploaderService'),
  OpenGraphService: Symbol.for('OpenGraphService'),
};
