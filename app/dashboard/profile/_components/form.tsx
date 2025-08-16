'use client';

import { roles, users } from '@/app/generated/prisma';
import { use } from 'react';
import { Avatar } from '@heroui/avatar';
import { Card } from '@heroui/card';
import { Button } from '@heroui/button';
import { updateProfile } from '../actions';

export function UserForm({
  user,
}: {
  user: Promise<users & { roles: roles[] }>;
}) {
  const { image, name, email } = use(user);

  return (
    <Card className="w-fit p-6">
      <Avatar src={image?.toString()} />
      <p>{name}</p>
      <p>{email}</p>
      <Button onPress={updateProfile}>Edit</Button>
    </Card>
  );
}
