'use server';

import { prisma } from '@/app/lib/db';
import { emails } from '@/app/lib/email';
import { ErrorState } from '@/app/lib/types';
import EmailTemplate from './EmailTemplate';

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

      await emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email.toString()],
        subject: 'Reset password',
        react: EmailTemplate({ token }),
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
