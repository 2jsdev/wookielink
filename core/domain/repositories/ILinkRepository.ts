import { Link } from '@core/domain/entities/Link';

export interface ILinkRepository {
  getUserLinks(userId: string): Promise<Link[]>;
  findLinkById(id: string): Promise<Link | null>;
  findUserLinkByUrl(userId: string, url: string): Promise<Link | null>;
  createUserLink(link: Link): Promise<Link>;
  getMaxPositionByUser(userId: string): Promise<number>;
  updateUserLink(link: Link): Promise<Link>;
  deleteUserLink(id: string): Promise<void>;
}
