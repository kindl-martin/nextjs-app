'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ToastProvider } from '@heroui/toast';
import { RouterProvider } from '@react-aria/utils';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <RouterProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ToastProvider />
          {children}
        </NextThemesProvider>
      </RouterProvider>
    </HeroUIProvider>
  );
}
