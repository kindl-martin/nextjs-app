'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/app/lib/db';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { ErrorState } from '@/app/lib/types';
import { authGuard } from '@/app/lib/auth';

export async function register(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
  await authGuard();

  const { password, email } = Object.fromEntries(formData.entries());

  try {
    if (password && email) {
      const hashedPassword = await bcrypt.hash(password.toString(), 10);

      const user = await prisma.users.create({
        data: {
          email: email.toString(),
          password: hashedPassword,
        },
      });

      if (user) {
        await signIn('credentials', {
          email,
          password,
          redirectTo: '/dashboard',
        });
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: {
              title: 'Invalid credentials',
              description: 'Please check your email and password.',
            },
          };
        default:
          return {
            error: {
              title: 'Something went wrong',
              description: 'Please try again later.',
            },
          };
      }
    }
    throw error;
  }
}
