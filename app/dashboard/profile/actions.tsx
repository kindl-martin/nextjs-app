'use server';

import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { ErrorState } from '@/app/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateProfile(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
  const session = await auth();
  const { name, email, phone } = Object.fromEntries(formData.entries());

  try {
    await prisma.users.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        ...(name && { name: name.toString() }),
        ...(email && { email: email.toString() }),
        ...(phone && { phone: phone.toString() }),
      },
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return {
      error: {
        title: 'Database Error',
        description: 'Failed to update profile.',
      },
    };
  }

  revalidatePath('/dashboard/profile');
}
