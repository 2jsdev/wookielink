export interface File {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}

export interface UploadedFileResponse {
  filename: string;
  path: string;
}

export interface FileUploaderService {
  upload: (file: File) => Promise<UploadedFileResponse | undefined>;
  bulkUpload: (files: File[]) => Promise<UploadedFileResponse[] | undefined>;
  delete: (path: string) => Promise<void>;
}
