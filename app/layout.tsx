import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Providers } from '@/app/providers';
import { Metadata } from 'next';
import NavigationBar from '@/app/ui/dashboard/navbar';
import ScrollBar from '@/app/ui/dashboard/scrollbar';
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
          <ScrollBar />
        </Providers>
      </body>
    </html>
  );
}
