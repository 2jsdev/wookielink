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
  upload: (files: File[]) => Promise<UploadedFileResponse[] | undefined>;
}
