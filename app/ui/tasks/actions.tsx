'use server';

import { task_state, tasks, timer } from '@/app/generated/prisma';
import { z } from 'zod';
import { prisma } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { ActionState } from '@/app/ui/types';

const UserFormSchema = z.object({
  name: z.string().min(1, 'Please fill task name.'),
});

export async function createTask(
  userId: string,
  prevState: ActionState | undefined,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = UserFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create Task.',
    };
  }

  try {
    const { name } = validatedFields.data;

    const maxPosition = await prisma.tasks.aggregate({
      _max: {
        position: true,
      },
    });

    await prisma.tasks.create({
      data: {
        name,
        user_id: userId,
        position: Number(maxPosition._max.position) + 1,
      },
    });
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }

  revalidatePath('/dashboard/tasks');
}

export async function toggleTaskState(id: string, state: task_state) {
  try {
    await prisma.tasks.update({
      where: { id },
      data: { state },
    });
  } catch (e) {
    return {
      message: 'Database Error: Failed to toggle Task state.',
    };
  }

  revalidatePath('/dashboard/tasks');
}

export async function startTimer(taskId: string) {
  try {
    await prisma.timer.create({
      data: { task_id: taskId },
    });
  } catch (e) {
    return {
      message: 'Database Error: Failed to start Timer.',
    };
  }

  revalidatePath('/dashboard/tasks');
}

export async function stopTimer(timerId: string) {
  try {
    await prisma.timer.update({
      where: { id: timerId },
      data: { end: new Date() },
    });
  } catch (e) {
    return {
      message: 'Database Error: Failed to start Timer.',
    };
  }

  revalidatePath('/dashboard/tasks');
}

export async function orderTasks(newOrder: (tasks & { timer: timer[] })[]) {
  try {
    await Promise.all(
      newOrder.map(async (task, index) => {
        const position = newOrder.length - index;

        console.log('Updating task', task.id, 'to position', position);

        await prisma.tasks.update({
          where: { id: task.id },
          data: { position },
        });
      }),
    );
  } catch (e) {
    return {
      message: 'Database Error: Failed to order Tasks.',
    };
  }
}

export async function deleteTask(taskId: string) {
  try {
    console.log('Deleting task', taskId);
    const res = await prisma.tasks.delete({
      where: { id: taskId },
    });
    console.log('Deleted task', res);
  } catch (e) {
    return {
      message: 'Database Error: Failed to delete Task.',
    };
  }

  revalidatePath('/dashboard/tasks');
}
