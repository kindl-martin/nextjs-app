import { Suspense } from 'react';
import { Skeleton } from '@heroui/skeleton';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { UserForm } from '@/app/ui/profile/form';

export default async function Page() {
  const session = await auth();

  const user = prisma.users.findUniqueOrThrow({
    where: {
      id: session?.user?.id,
    },
    include: {
      roles: true,
    },
  });

  return (
    <Suspense fallback={<Skeleton className="h-64 w-96 rounded-2xl" />}>
      <UserForm user={user} />
    </Suspense>
  );
}
