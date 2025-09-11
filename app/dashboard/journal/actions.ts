'use server';

import { ErrorState } from '@/app/lib/types';
import { prisma } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function createJournalEntry(
  prevState: ErrorState | undefined,
  formData: FormData,
) {
  const { title, message } = Object.fromEntries(formData.entries());

  try {
    await prisma.journal.create({
      data: {
        title: title.toString(),
        message: message.toString(),
      },
    });
  } catch (error) {
    console.error('Failed to create Journal entry:', error);
    return {
      error: {
        title: 'Database Error',
        description: 'Failed to create Journal entry.',
      },
    };
  }

  revalidatePath('/dashboard/journal');
}
