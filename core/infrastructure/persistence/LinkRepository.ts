import { injectable } from 'inversify';
import { Link } from '@core/domain/entities/Link';
import { ILinkRepository } from '@core/domain/repositories/ILinkRepository';
import { prisma } from '@core/shared/infrastructure/persistence/prisma';
import { LinkMapper } from '@core/infrastructure/mappers/LinkMapper';

@injectable()
export class LinkRepository implements ILinkRepository {
  async getUserLinks(userId: string): Promise<Link[]> {
    try {
      const links = await prisma.link.findMany({
        where: { userId },
        orderBy: { position: 'asc' },
      });
      return links.map((link: any) => LinkMapper.toDomain(link));
    } catch (error) {
      throw error;
    }
  }

  async findLinkById(id: string): Promise<Link | null> {
    try {
      const link = await prisma.link.findUnique({ where: { id } });
      return link ? LinkMapper.toDomain(link) : null;
    } catch (error) {
      throw error;
    }
  }
  async createUserLink(link: Link): Promise<Link> {
    try {
      const persistenceLink = LinkMapper.toPersistence(link);
      const createdLink = await prisma.link.create({
        data: persistenceLink,
      });
      const domainLink = LinkMapper.toDomain(createdLink);
      return domainLink;
    } catch (error) {
      throw error;
    }
  }

  async getMaxPositionByUser(userId: string): Promise<number> {
    try {
      const maxPosition = await prisma.link.findFirst({
        where: { userId },
        orderBy: { position: 'desc' },
      });
      return maxPosition ? maxPosition.position : 0;
    } catch (error) {
      throw error;
    }
  }

  async findUserLinkByUrl(userId: string, url: string): Promise<Link | null> {
    try {
      const link = await prisma.link.findFirst({
        where: { userId, url, active: true },
      });
      return link ? LinkMapper.toDomain(link) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateUserLink(link: Link): Promise<Link> {
    try {
      const persistenceLink = LinkMapper.toPersistence(link);
      const updatedLink = await prisma.link.update({
        where: { id: link.id.toString() },
        data: persistenceLink,
      });
      return LinkMapper.toDomain(updatedLink);
    } catch (error) {
      throw error;
    }
  }

  async deleteUserLink(id: string): Promise<void> {
    try {
      await prisma.link.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findByShortCode(shortCode: string): Promise<string | null> {
    try {
      const link = await prisma.link.findFirst({
        where: { shortCode },
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      return link ? link.user.username : null;
    } catch (error) {
      throw error;
    }
  }
}
