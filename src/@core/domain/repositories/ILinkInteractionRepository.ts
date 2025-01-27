import { LinkInteraction } from '../entities/LinkInteraction';

export interface ILinkInteractionRepository {
  createLinkInteraction(interaction: LinkInteraction): Promise<LinkInteraction>;
  findInteractionsByLinkId(linkId: string): Promise<LinkInteraction[]>;
  findInteractionsByUserId(userId: string): Promise<LinkInteraction[]>;
  findInteractionsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<LinkInteraction[]>;
  getTotalInteractionsByLink(linkId: string): Promise<number>;
}
