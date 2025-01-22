type PageRoutesType = {
  title: string;
  href: string;
  icon?: string;
};

export const page_routes: PageRoutesType[] = [
  { title: 'Links', href: '/admin', icon: 'Link' },
  { title: 'Appearance', href: '/admin/appearance', icon: 'Brush' },
  { title: 'Analytics', href: '/admin/analytics', icon: 'ChartBar' },
  { title: 'Settings', href: '/admin/settings', icon: 'Settings' },
];
