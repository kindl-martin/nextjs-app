'use server';

import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';

export async function updateProfile() {
  const session = await auth();

  await prisma.users.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      phone: '+420735253288',
    },
  });
}
