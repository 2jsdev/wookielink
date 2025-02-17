import { injectable } from 'inversify';
import { Client } from 'minio';
import {
  File,
  IFileUploaderService,
  UploadedFileResponse,
} from '@core/application/services/IFileUploaderService';

@injectable()
export class MinioFileUploader implements IFileUploaderService {
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

  async upload(
    file: File,
    path?: string
  ): Promise<UploadedFileResponse | undefined> {
    try {
      const filename = file.name;
      const objectPath = path ? `${path}/${filename}` : filename;

      await this.client.putObject(
        this.bucketName,
        objectPath,
        Buffer.from(file.content),
        file.content.byteLength,
        {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        }
      );

      return {
        filename,
        path: `${this.bucketName}/${objectPath}`,
      };
    } catch (error) {
      console.error('Error uploading to MinIO:', error);
      return undefined;
    }
  }

  async delete(path: string): Promise<void> {
    try {
      if (!this.bucketName || !process.env.MINIO_SERVER_URL) {
        throw new Error(
          'MinIO configuration is invalid: Missing bucket name or server URL.'
        );
      }

      const serverUrl = process.env.MINIO_SERVER_URL;
      const bucketName = this.bucketName;

      if (!path.startsWith(`${serverUrl}/${bucketName}/`)) {
        throw new Error(
          `Invalid path: The provided path does not match the configured server or bucket.`
        );
      }

      const objectName = path.slice(`${serverUrl}/${bucketName}/`.length);

      if (!objectName) {
        throw new Error(
          'Invalid path: No object name found in the provided path.'
        );
      }

      await this.client.removeObject(bucketName, objectName);
    } catch (error) {
      console.error('Error deleting object from MinIO:', error);
      throw new Error(
        'Failed to delete object from MinIO. Please check the logs.'
      );
    }
  }
}
