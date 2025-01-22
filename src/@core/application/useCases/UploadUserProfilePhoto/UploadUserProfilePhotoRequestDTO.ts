export interface UploadUserProfilePhotoRequestDTO {
  userId: string;
  file: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}
