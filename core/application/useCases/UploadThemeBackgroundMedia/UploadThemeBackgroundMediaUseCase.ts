import { inject, injectable } from 'inversify';
import { UploadThemeBackgroundMediaDTO } from '@core/application/useCases/UploadThemeBackgroundMedia/UploadThemeBackgroundMediaDTO';
import { UploadThemeBackgroundMediaResponse } from '@core/application/useCases/UploadThemeBackgroundMedia/UploadThemeBackgroundMediaResponse';
import { UploadThemeBackgroundMediaErrors } from '@core/application/useCases/UploadThemeBackgroundMedia/UploadThemeBackgroundMediaErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IThemeRepository } from '@core/domain/repositories/IThemeRepository';
import { IFileUploaderService } from '@core/application/services/IFileUploaderService';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { Theme } from '@core/domain/entities/Theme';
import { backgroundTypes } from '@core/domain/entities/Background';

@injectable()
export class UploadThemeBackgroundMediaUseCase {
  constructor(
    @inject(TYPES.ThemeRepository) private themeRepository: IThemeRepository,
    @inject(TYPES.FileUploaderService)
    private fileUploaderService: IFileUploaderService
  ) {}

  async execute(
    request: UploadThemeBackgroundMediaDTO
  ): Promise<UploadThemeBackgroundMediaResponse> {
    try {
      const { userId, themeId, backgroundMedia } = request;
      const existingTheme = await this.themeRepository.findThemeById(themeId);

      if (!existingTheme) {
        return left(
          new UploadThemeBackgroundMediaErrors.ThemeNotFoundError(themeId)
        );
      }

      if (existingTheme.isCustom && existingTheme.ownerId !== userId) {
        return left(
          new UploadThemeBackgroundMediaErrors.ThemeNotOwnedByUserError(themeId)
        );
      }

      const allowedImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      const isImage = allowedImageTypes.includes(backgroundMedia.type);

      if (!isImage) {
        return left(
          new UploadThemeBackgroundMediaErrors.InvalidFileTypeError()
        );
      }

      const minioUrl = process.env.MINIO_SERVER_URL || '';
      try {
        if (
          existingTheme.background.imageUrl &&
          existingTheme.background.imageUrl.startsWith(minioUrl)
        ) {
          await this.fileUploaderService.delete(existingTheme.background.imageUrl);
        }
      } catch (error) {
        console.error('Failed to delete existing background media:', error);
        return left(new UploadThemeBackgroundMediaErrors.MediaDeleteError());
      }

      const uploadedFile = await this.fileUploaderService.upload(
        {
          ...backgroundMedia,
        },
        `users/${userId}/themes`
      );

      if (!uploadedFile) {
        return left(new UploadThemeBackgroundMediaErrors.MediaUploadError());
      }

      const newMediaUrl = `${minioUrl}/${uploadedFile.path}`;

      existingTheme.background.props.type = backgroundTypes.IMAGE;
      existingTheme.background.props.imageUrl = newMediaUrl;
      existingTheme.background.props.videoUrl = undefined;

      const updatedTheme = await this.themeRepository.updateTheme(existingTheme);

      return right(Result.ok<Theme>(updatedTheme));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Unexpected error uploading background media:', err);
      return left(new AppError.UnexpectedError(err));
    }
  }
}
