'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { ErrorState } from '@/app/lib/types';
import { authGuard } from '@/app/lib/auth';

export async function authenticate(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
  await authGuard();

  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
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
