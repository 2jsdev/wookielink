export interface ReorderUserLinksDTO {
  userId: string;
  links: Array<{
    id: string;
    position: number;
  }>;
}
