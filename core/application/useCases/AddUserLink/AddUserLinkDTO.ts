export interface AddUserLinkDTO {
  userId: string;
  link: {
    title?: string;
    url?: string;
  };
}
