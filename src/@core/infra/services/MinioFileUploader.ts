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

  async upload(file: File): Promise<UploadedFileResponse | undefined> {
    try {
      await this.client.putObject(
        this.bucketName,
        file.name,
        Buffer.from(file.content),
        file.content.byteLength,
        {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        }
      );

      return {
        filename: file.name,
        path: `${this.bucketName}/${file.name}`,
      };
    } catch (error) {
      console.error('Error uploading to MinIO:', error);
      return undefined;
    }
  }

  async bulkUpload(files: File[]): Promise<UploadedFileResponse[] | undefined> {
    try {
      const uploadPromises = files.map(async (file) => {
        await this.client.putObject(
          this.bucketName,
          file.name,
          Buffer.from(file.content),
          file.content.byteLength,
          {
            'Content-Type': file.type,
            'x-amz-acl': 'public-read',
          }
        );

        return {
          filename: file.name,
          path: `${this.bucketName}/${file.name}`,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      return uploadedFiles;
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
      console.log(
        `Object ${objectName} successfully deleted from bucket ${bucketName}`
      );
    } catch (error) {
      console.error('Error deleting object from MinIO:', error);
      throw new Error(
        'Failed to delete object from MinIO. Please check the logs.'
      );
    }
  }
}
