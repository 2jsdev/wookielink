export interface UploadFilesRequestDTO {
  files: Array<{
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  }>;
}
