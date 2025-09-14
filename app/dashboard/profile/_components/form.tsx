'use client';

import { roles, users } from '@/app/generated/prisma';
import { use, useActionState } from 'react';
import { Avatar } from '@heroui/avatar';
import { Card } from '@heroui/card';
import { Button } from '@heroui/button';
import { updateProfile } from '../actions';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { addToast } from '@heroui/toast';
import { ErrorState } from '@/app/lib/types';

export function UserForm({
  user,
}: {
  user: Promise<users & { roles: roles[] }>;
}) {
  const { image, name, email, phone } = use(user);

  const [, formAction, isPending] = useActionState(
    async (prevState: ErrorState | undefined, formData: FormData) => {
      const response = await updateProfile(prevState, formData);
      if (response?.error) {
        addToast({
          title: response.error.title,
          description: response.error.description,
          color: 'danger',
        });
      }
      return response;
    },
    undefined,
  );

  return (
    <Card className="w-fit p-6">
      <Form action={formAction}>
        <Avatar src={image?.toString()} />
        <Input name="name" defaultValue={name ?? ''} placeholder="Name" />
        <Input name="email" defaultValue={email ?? ''} placeholder="Email" />
        <Input name="phone" defaultValue={phone ?? ''} placeholder="Phone" />
        <Button type="submit" isLoading={isPending}>
          Edit
        </Button>
      </Form>
    </Card>
  );
}
