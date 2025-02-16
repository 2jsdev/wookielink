import ogs from 'open-graph-scraper';
import { injectable } from 'inversify';
import { OpenGraphService, OpenGraph } from '@core/application/services/OpenGraphService';

@injectable()
export class OpenGraphScraperService implements OpenGraphService {
  private readonly openGraphApiKey = process.env.OPEN_GRAPH_API_KEY;
  private readonly openGraphApiUrl = process.env.OPEN_GRAPH_API_URL;
  private readonly cache = new Map<string, { data: OpenGraph; expiresAt: number }>();
  private readonly cacheTTL = 24 * 60 * 60 * 1000;

  async scrape(url: string): Promise<OpenGraph | undefined> {
    try {
      const options = { url, timeout: 10000 };
      const { error, result } = await ogs(options);

      if (!error && result.ogTitle) {
        return result as OpenGraph;
      }
      
      console.warn('Falling back to OpenGraph.io for:', url);
      return await this.scrapeFromOpenGraphIo(url);
    } catch (err) {
      console.error('Unexpected error in OpenGraphScraperService:', err);
      return undefined;
    }
  }

  private async scrapeFromOpenGraphIo(url: string): Promise<OpenGraph | undefined> {
    try {
      if (this.cache.has(url)) {
        const cachedData = this.cache.get(url)!;
        if (Date.now() < cachedData.expiresAt) {
          console.log(`Returning cached data for ${url}`);
          return cachedData.data;
        }
        this.cache.delete(url);
      }

      const apiUrl = `${this.openGraphApiUrl}${encodeURIComponent(url)}?app_id=${this.openGraphApiKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error('Failed to fetch from OpenGraph.io:', response.statusText);
        return undefined;
      }
      
      const data = await response.json();
      if (!data.openGraph) {
        console.warn('No OpenGraph data found in OpenGraph.io response');
        return undefined;
      }

      const openGraphData: OpenGraph = {
        ogTitle: data.openGraph.title,
        ogType: data.openGraph.type,
        ogUrl: data.openGraph.url,
        ogDescription: data.openGraph.description,
        ogImage: data.openGraph.image ? [{ url: data.openGraph.image.url }] : undefined,
        charset: data.requestInfo?.responseContentType?.split('charset=')[1] || 'utf-8',
        requestUrl: data.url,
        success: true,
      };

      this.cache.set(url, { data: openGraphData, expiresAt: Date.now() + this.cacheTTL });

      return openGraphData;
    } catch (error) {
      console.error('Error fetching OpenGraph data from OpenGraph.io:', error);
      return undefined;
    }
  }
}
