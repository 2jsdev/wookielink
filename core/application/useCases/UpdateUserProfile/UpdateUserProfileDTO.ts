export interface UpdateUserProfileDTO {
  userId: string;
  name?: string;
  email?: string;
  username?: string;
  image?: string;
  imagePreview?: string;
  imagePreviewBgColor?: string;
  bio?: string;
}
