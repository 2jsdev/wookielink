import type { Metadata } from 'next';
import {
  Inter,
  Roboto,
  Montserrat,
  Poppins,
  Overpass_Mono,
} from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AppProviders from '@/lib/providers/app-provider';
import { ThemeProvider } from 'next-themes';

import './globals.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
});

const overpass_mono = Overpass_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-overpass-mono',
});

export const metadata: Metadata = {
  title:
    'Link in bio tool: Everything you are, in one simple link | Wookielink',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} ${roboto.variable} ${montserrat.variable} ${poppins.variable} ${overpass_mono.variable}`}
      >
        <ThemeProvider attribute="class" enableSystem={false}>
          <AppProviders>{children}</AppProviders>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
