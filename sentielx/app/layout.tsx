import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "CodeDream · Hack de Science · Ojass '26",
  description: 'Code Quality Review — npm package by Team Daydream',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}