'use server';

import { prisma } from '@/app/lib/db';
import { ErrorState } from '@/app/lib/types';

export async function triggerResetPassword(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
  const { email } = Object.fromEntries(formData.entries());

  const token = btoa(JSON.stringify({ email }));

  try {
    if (email) {
      const user = await prisma.users.findUniqueOrThrow({
        where: {
          email: email.toString(),
        },
      });

      await prisma.users.update({
        data: {
          password_reset_token: token,
        },
        where: {
          id: user.id,
        },
      });
    }
  } catch (error) {
    console.error('Failed to reset password:', error);
    return {
      error: {
        title: 'Something went wrong',
        description: 'Please try again later.',
      },
    };
  }
}
