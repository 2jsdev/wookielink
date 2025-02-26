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

      // Si tu dominio requiere que un theme con ownerId = userId sea el "dueño",
      // verifica aquí si (existingTheme.ownerId !== userId).
      // O, si es un theme global y no hay ownerId, podrías permitir la actualización
      // según la lógica que definas.
      if (existingTheme.isCustom && existingTheme.ownerId !== userId) {
        return left(
          new UploadThemeBackgroundMediaErrors.ThemeNotOwnedByUserError(themeId)
        );
      }

      // Verificamos tipos permitidos
      const allowedImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      const allowedVideoTypes = ['video/mp4', 'video/webm'];
      // Podrías expandir esta lista según tus necesidades.

      const isImage = allowedImageTypes.includes(backgroundMedia.type);
      const isVideo = allowedVideoTypes.includes(backgroundMedia.type);

      if (!isImage && !isVideo) {
        return left(
          new UploadThemeBackgroundMediaErrors.InvalidFileTypeError()
        );
      }

      // Si ya hay un media en background (imageUrl o videoUrl), podrías intentar borrarlo
      // de tu storage si quieres sobreescribir.
      // Por ejemplo:
      const minioUrl = process.env.MINIO_SERVER_URL || '';

      // Eliminación condicional
      try {
        if (
          isImage &&
          existingTheme.background.imageUrl?.startsWith(minioUrl)
        ) {
          await this.fileUploaderService.delete(
            existingTheme.background.imageUrl
          );
        } else if (
          isVideo &&
          existingTheme.background.videoUrl?.startsWith(minioUrl)
        ) {
          await this.fileUploaderService.delete(
            existingTheme.background.videoUrl
          );
        }
      } catch (error) {
        console.error('Failed to delete existing background media:', error);
        return left(new UploadThemeBackgroundMediaErrors.MediaDeleteError());
      }

      // Subimos el nuevo archivo
      const uploadedFile = await this.fileUploaderService.upload(
        {
          ...backgroundMedia,
          // Ajusta si tu fileUploaderService requiere un "Buffer" en lugar de "ArrayBuffer"
          // o una ruta destino, etc.
        },
        `users/${userId}/themes`
      );

      if (!uploadedFile) {
        return left(new UploadThemeBackgroundMediaErrors.MediaUploadError());
      }

      // Ej: path = "users/<userId>/themes/<filename>"
      const newMediaUrl = `${minioUrl}/${uploadedFile.path}`;

      // Actualizamos la entidad en memoria
      if (isImage) {
        existingTheme.background.props.type = backgroundTypes.IMAGE;
        existingTheme.background.props.imageUrl = newMediaUrl;
        // Podrías limpiar videoUrl si lo deseas:
        existingTheme.background.props.videoUrl = undefined;
      } else if (isVideo) {
        existingTheme.background.props.type = backgroundTypes.VIDEO;
        existingTheme.background.props.videoUrl = newMediaUrl;
        // Limpia imageUrl si lo deseas:
        existingTheme.background.props.imageUrl = undefined;
      }

      // Persistimos el cambio
      const updatedTheme =
        await this.themeRepository.updateTheme(existingTheme);

      return right(Result.ok<Theme>(updatedTheme));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Unexpected error uploading background media:', err);
      return left(new AppError.UnexpectedError(err));
    }
  }
}
