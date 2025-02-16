export interface UploadUserProfilePhotoDTO {
  userId: string;
  photo: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}
