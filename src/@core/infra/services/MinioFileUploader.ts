import { injectable } from 'inversify';
import { Client } from 'minio';
import {
  File,
  FileUploaderService,
  UploadedFileResponse,
} from '@/@core/application/services/FileUploaderService';

@injectable()
export class MinioFileUploader implements FileUploaderService {
  private client: Client;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.MINIO_BUCKET_NAME as string;
    const serverUrl = new URL(process.env.MINIO_SERVER_URL || '');

    this.client = new Client({
      endPoint: serverUrl.hostname,
      port: parseInt(serverUrl.port || '443'),
      useSSL: serverUrl.protocol === 'https:',
      accessKey: process.env.MINIO_ROOT_USER || '',
      secretKey: process.env.MINIO_ROOT_PASSWORD || '',
    });
  }

  async upload(files: File[]): Promise<UploadedFileResponse[] | undefined> {
    try {
      const uploadPromises = files.map(async (file) => {
        const objectName = `${Date.now()}-${file.name}`;

        await this.client.putObject(
          this.bucketName,
          objectName,
          Buffer.from(file.content),
          file.content.byteLength,
          {
            'Content-Type': file.type,
            'x-amz-acl': 'public-read',
          }
        );

        return {
          filename: file.name,
          path: `${this.bucketName}/${objectName}`,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      return uploadedFiles;
    } catch (error) {
      console.error('Error uploading to MinIO:', error);
      return undefined;
    }
  }
}
