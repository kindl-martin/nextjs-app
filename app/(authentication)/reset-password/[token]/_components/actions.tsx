'use server';

import { prisma } from '@/app/lib/db';
import { ErrorState } from '@/app/lib/types';
import bcrypt from 'bcrypt';

export async function resetPassword(
  token: string,
  prevState: ErrorState | undefined,
  formData: FormData,
) {
  const { password } = Object.fromEntries(formData.entries());

  const decodedUriToken = decodeURIComponent(token);
  const decodedToken = atob(decodedUriToken);
  const email = JSON.parse(decodedToken).email;

  try {
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    await prisma.users.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: email.toString(),
      },
    });
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
