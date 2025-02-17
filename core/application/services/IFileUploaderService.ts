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

export interface IFileUploaderService {
  upload: (
    file: File,
    path?: string
  ) => Promise<UploadedFileResponse | undefined>;
  delete: (path: string) => Promise<void>;
}
