import { injectable, inject } from 'inversify';
import type { FileUploaderService } from '@/@core/application/services/FileUploaderService';
import { UploadFilesRequestDTO } from '@/@core/application/useCases/uploadFiles/UploadFilesRequestDTO';
import { UploadFilesResponse } from '@/@core/application/useCases/uploadFiles/UploadFilesResponse';

@injectable()
export class UploadFilesUseCase {
  constructor(
    @inject('FileUploaderService')
    private fileUploaderService: FileUploaderService
  ) {}

  async execute(
    request: UploadFilesRequestDTO
  ): Promise<UploadFilesResponse | undefined> {
    const files = request.files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.extension,
      content: file.content,
    }));

    const uploadedFiles = await this.fileUploaderService.upload(files);

    if (!uploadedFiles) {
      return undefined;
    }

    return {
      uploadedFiles: uploadedFiles.map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    };
  }
}
