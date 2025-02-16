export interface UploadUserLinkThumbnailDTO {
  userId: string;
  linkId: string;
  thumbnail: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}
