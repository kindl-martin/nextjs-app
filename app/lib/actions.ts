'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/app/lib/db';
import bcrypt from 'bcrypt';

export type ErrorState = {
  error: {
    title: string;
    description: string;
  };
};

export async function register(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
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

export async function authenticate(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
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
