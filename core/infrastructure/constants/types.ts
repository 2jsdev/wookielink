export const TYPES = {
  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  LinkRepository: Symbol.for('LinkRepository'),
  ThemeRepository: Symbol.for('ThemeRepository'),
  ActivityRepository: Symbol.for('ActivityRepository'),

  // Use cases
  CheckUsernameAvailabilityUseCase: Symbol.for(
    'CheckUsernameAvailabilityUseCase'
  ),
  GetUserProfileUseCase: Symbol.for('GetUserProfileUseCase'),
  UpdateUserProfileUseCase: Symbol.for('UpdateUserProfileUseCase'),
  UploadUserProfilePhotoUseCase: Symbol.for('UploadUserProfilePhotoUseCase'),
  UpdateUserImagePreviewWithColorUseCase: Symbol.for(
    'UpdateUserImagePreviewWithColorUseCase'
  ),

  AddUserLinkUseCase: Symbol.for('AddUserLinkUseCase'),
  UpdateUserLinkUseCase: Symbol.for('UpdateUserLinkUseCase'),
  DeleteUserLinkUseCase: Symbol.for('DeleteUserLinkUseCase'),
  ReorderUserLinksUseCase: Symbol.for('ReorderUserLinksUseCase'),
  UploadUserLinkThumbnailUseCase: Symbol.for('UploadUserLinkThumbnailUseCase'),
  DeleteUserLinkThumbnailUseCase: Symbol.for('DeleteUserLinkThumbnailUseCase'),
  GetUsernameByShortCodeUseCase: Symbol.for('GetUsernameByShortCodeUseCase'),
  GetUserLifetimeMetricsUseCase: Symbol.for('GetUserLifetimeMetricsUseCase'),
  GetAudienceMetricsUseCase: Symbol.for('GetAudienceMetricsUseCase'),

  GetPublicProfileUseCase: Symbol.for('GetPublicProfileUseCase'),

  CreateDefaultThemeUseCase: Symbol.for('CreateDefaultThemeUseCase'),
  UpdateThemeUseCase: Symbol.for('UpdateThemeUseCase'),
  GetUserThemeUseCase: Symbol.for('GetUserThemeUseCase'),
  UpdateUserThemeSelectionUseCase: Symbol.for(
    'UpdateUserThemeSelectionUseCase'
  ),

  RegisterActivityUseCase: Symbol.for('RegisterActivityUseCase'),

  // Services
  FileUploaderService: Symbol.for('FileUploaderService'),
  OpenGraphService: Symbol.for('OpenGraphService'),
};
