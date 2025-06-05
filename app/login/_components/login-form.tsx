'use client';

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@heroui/button';
import { useActionState, useEffect } from 'react';
import { authenticate } from './actions';
import { Card } from '@heroui/card';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Spacer } from '@heroui/spacer';
import { addToast } from '@heroui/toast';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  useEffect(() => {
    if (state?.error) {
      addToast({
        title: state.error.title,
        description: state.error.description,
        color: 'danger',
      });
    }
  }, [state]);

  return (
    <Card className="p-6">
      <Form action={formAction}>
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <Input
          data-testid="login-email-input"
          type="email"
          name="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter email address"
          isRequired
          startContent={<AtSymbolIcon className="h-4 w-4" />}
        />
        <Spacer y={1} />
        <Input
          data-testid="login-password-input"
          type="password"
          name="password"
          label="Password"
          labelPlacement="outside"
          placeholder="Enter password"
          isRequired
          startContent={<KeyIcon className="h-4 w-4" />}
        />
        <Spacer y={2} />
        <Button
          data-testid="login-submit"
          className="mt-4 w-full"
          aria-disabled={isPending}
          isLoading={isPending}
          color="primary"
          type="submit"
        >
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </Form>
    </Card>
  );
}
