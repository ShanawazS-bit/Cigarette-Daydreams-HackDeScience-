import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const offbit = localFont({
  src: './font/OffBit-DotBold.ttf',
  variable: '--font-offbit',
});

export const metadata: Metadata = {
  title: "CodeDream · Hack de Science · Ojass '26",
  description: 'Code Quality Review — npm package by Team Daydream',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${offbit.variable}`}>
      <body>{children}</body>
    </html>
  );
}