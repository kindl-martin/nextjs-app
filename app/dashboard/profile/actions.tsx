'use server';

import { prisma } from '@/app/lib/db';

export async function updateProfile() {
  await prisma.users.update({
    where: {
      id: 'ed3869ba-7c54-4cf1-b4ba-6f41a7fc89d6',
    },
    data: {
      phone: '+420735253288',
    },
  });
}
