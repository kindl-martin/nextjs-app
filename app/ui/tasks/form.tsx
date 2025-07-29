'use client';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { useActionState } from 'react';
import { createTask } from '@/app/ui/tasks/actions';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function CreateTaskForm({ userId }: { userId: string }) {
  const initialState = { message: '', errors: {} };
  const createTaskWithId = createTask.bind(null, userId);

  const [state, formAction, isPending] = useActionState(
    createTaskWithId,
    initialState,
  );

  return (
    <Form
      action={formAction}
      validationErrors={state?.errors}
      className="flex-row"
    >
      <Input isRequired name="name" placeholder="Add new task" />
      <Button
        className="shrink-0"
        type="submit"
        color="primary"
        isLoading={isPending}
        startContent={<PlusIcon className="h-4 w-4" />}
      >
        Create Task
      </Button>
    </Form>
  );
}
