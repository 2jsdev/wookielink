export enum ActivityType {
  View = 'View',
  Click = 'Click',
}

export interface Activity {
  type: ActivityType;
  userId: string;
  linkId: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent: string;
  os?: string;
  browser?: string;
  screen?: string;
  loc?: string;
  org?: string;
  timezone?: string;
}
