import { extractOpenGraph } from '@devmehq/open-graph-extractor';
import { injectable } from 'inversify';
import { OpenGraphService, OpenGraph } from '@core/application/services/OpenGraphService';

@injectable()
export class OpenGraphScraperService implements OpenGraphService {
  private readonly cache = new Map<string, { data: OpenGraph; expiresAt: number }>();
  private readonly cacheTTL = 24 * 60 * 60 * 1000;

  async scrape(url: string): Promise<OpenGraph | undefined> {
    try {
      if (this.cache.has(url)) {
        const cachedData = this.cache.get(url)!;
        if (Date.now() < cachedData.expiresAt) {
          console.log(`Returning cached data for ${url}`);
          return cachedData.data;
        }
        this.cache.delete(url);
      }

      const response = await fetch(url);
      if (!response.ok) {
        console.error('Failed to fetch HTML from:', url);
        return undefined;
      }
      const html = await response.text();
      
      const openGraphData = extractOpenGraph(html) as OpenGraph;
      if (!openGraphData.ogTitle) {
        console.warn('No OpenGraph data found for:', url);
        return undefined;
      }

      this.cache.set(url, { data: openGraphData, expiresAt: Date.now() + this.cacheTTL });
      
      return openGraphData;
    } catch (err) {
      console.error('Unexpected error in OpenGraphScraperService:', err);
      return undefined;
    }
  }
}
