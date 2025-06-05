import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/app/providers';
import { Metadata } from 'next';
import NavigationBar from '@/app/ui/dashboard/navbar';
import { auth } from '@/auth';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Next.js app',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <NavigationBar session={session} />
          <div className="mx-auto mt-10 flex max-w-[1280px] flex-col px-4">
            {children}
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
