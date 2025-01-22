import { injectable } from 'inversify';
import { ILinkRepository } from '@/@core/domain/repositories/ILinkRepository';
import { Link } from '@/@core/domain/entities/Link';
import { LinkMapper } from '@/@core/infra/mappers/LinkMapper';
import { prisma } from '@/@core/infra/prisma';

@injectable()
export class PrismaLinkRepository implements ILinkRepository {
  async findLinkById(id: string): Promise<Link | null> {
    const link = await prisma.link.findUnique({
      where: { id },
    });

    return link ? LinkMapper.toDomain(link) : null;
  }

  async findLinksByUserId(userId: string): Promise<Link[]> {
    const links = await prisma.link.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });

    return links.map(LinkMapper.toDomain);
  }

  async createLink(link: Link): Promise<Link> {
    const persistenceLink = LinkMapper.toPersistence(link);

    const createdLink = await prisma.link.create({
      data: persistenceLink,
    });

    return LinkMapper.toDomain(createdLink);
  }

  async updateLink(link: Link): Promise<Link> {
    const persistenceLink = LinkMapper.toPersistence(link);
    const updatedLink = await prisma.link.update({
      where: { id: link.id },
      data: persistenceLink,
    });

    return LinkMapper.toDomain(updatedLink);
  }

  async deleteLink(link: Link): Promise<void> {
    await prisma.link.delete({
      where: { id: link.id },
    });
  }

  async getMaxOrderForLinks(userId: string): Promise<number> {
    const maxOrder = await prisma.link.findFirst({
      where: { userId, archived: false },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    return maxOrder?.order ?? 0;
  }

  async reorderLinks(
    userId: string,
    orderedLinks: { id: string; order: number }[]
  ): Promise<void> {
    const updatePromises = orderedLinks.map((link) =>
      prisma.link.update({
        where: { id: link.id },
        data: { order: link.order },
      })
    );

    await Promise.all(updatePromises);
  }
}
