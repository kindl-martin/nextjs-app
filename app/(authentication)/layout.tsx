import { ReactNode } from 'react';
import { Card } from '@heroui/card';

export default function Layout({ children }: { children: ReactNode }) {
  return <Card className="mx-auto w-full max-w-lg p-6">{children}</Card>;
}
