export interface GetPublicProfileByUsernameDTO {
  username: string;
}

export interface PublicProfileResponseDTO {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
  links: {
    id: string;
    label: string;
    url: string;
    visible: boolean;
    order: number;
  }[];
}
