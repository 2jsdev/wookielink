export interface ImageObject {
  height?: number;
  type?: string;
  url: string;
  width?: number;
  alt?: string;
}

export interface OpenGraph {
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogDescription?: string;
  ogImage?: ImageObject[];
  charset?: string;
  requestUrl?: string;
  success: boolean;
}

export interface IOpenGraphService {
  scrape(url: string): Promise<OpenGraph | undefined>;
}
