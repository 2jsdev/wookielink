export interface UploadThemeBackgroundMediaDTO {
  userId: string;
  themeId: string;
  backgroundMedia: {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  };
}
