export interface RegisterLinkClickDTO {
  linkId: string;
  userId: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent: string;
  os?: string;
  browser?: string;
  screen?: string;
}
