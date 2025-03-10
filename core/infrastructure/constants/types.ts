export const TYPES = {
  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  LinkRepository: Symbol.for('LinkRepository'),
  ThemeRepository: Symbol.for('ThemeRepository'),

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

  CreateDefaultThemeUseCase: Symbol.for('CreateDefaultThemeUseCase'),
  UpdateThemeUseCase: Symbol.for('UpdateThemeUseCase'),
  GetUserThemeUseCase: Symbol.for('GetUserThemeUseCase'),
  UpdateUserThemeSelectionUseCase: Symbol.for(
    'UpdateUserThemeSelectionUseCase'
  ),

  // Services
  FileUploaderService: Symbol.for('FileUploaderService'),
  OpenGraphService: Symbol.for('OpenGraphService'),
};
