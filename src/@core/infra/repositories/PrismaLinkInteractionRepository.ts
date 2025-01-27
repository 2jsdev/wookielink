import { injectable } from 'inversify';
import { ILinkInteractionRepository } from '@/@core/domain/repositories/ILinkInteractionRepository';
import { LinkInteraction } from '@/@core/domain/entities/LinkInteraction';
import { LinkInteractionMapper } from '@/@core/infra/mappers/LinkInteractionMapper';
import { prisma } from '@/@core/infra/prisma';

@injectable()
export class PrismaLinkInteractionRepository
  implements ILinkInteractionRepository
{
  async createLinkInteraction(
    interaction: LinkInteraction
  ): Promise<LinkInteraction> {
    const persistenceInteraction =
      LinkInteractionMapper.toPersistence(interaction);

    const createdInteraction = await prisma.linkInteraction.create({
      data: persistenceInteraction,
    });

    return LinkInteractionMapper.toDomain(createdInteraction);
  }

  async findInteractionsByLinkId(linkId: string): Promise<LinkInteraction[]> {
    const interactions = await prisma.linkInteraction.findMany({
      where: { linkId },
      orderBy: { interactedAt: 'desc' },
    });

    return interactions.map(LinkInteractionMapper.toDomain);
  }

  async findInteractionsByUserId(userId: string): Promise<LinkInteraction[]> {
    const interactions = await prisma.linkInteraction.findMany({
      where: { userId },
      orderBy: { interactedAt: 'desc' },
    });

    return interactions.map(LinkInteractionMapper.toDomain);
  }

  async findInteractionsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<LinkInteraction[]> {
    const interactions = await prisma.linkInteraction.findMany({
      where: {
        userId,
        interactedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { interactedAt: 'desc' },
    });

    return interactions.map(LinkInteractionMapper.toDomain);
  }

  async getTotalInteractionsByLink(linkId: string): Promise<number> {
    const totalInteractions = await prisma.linkInteraction.count({
      where: { linkId },
    });

    return totalInteractions;
  }
}
