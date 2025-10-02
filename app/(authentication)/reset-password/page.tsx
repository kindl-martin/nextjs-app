'use client';

import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@heroui/button';
import { useActionState } from 'react';
import { triggerResetPassword } from './_components/actions';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Spacer } from '@heroui/spacer';
import { addToast } from '@heroui/toast';
import { ErrorState } from '@/app/lib/types';

export default function Page() {
  const [, formAction, isPending] = useActionState(
    async (prevState: ErrorState | undefined, formData: FormData) => {
      const response = await triggerResetPassword(prevState, formData);
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
    <Form action={formAction}>
      <h1 className="mb-3 text-2xl">Please set email to continue.</h1>
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
      <Button
        data-testid="login-submit"
        className="mt-4 w-full"
        aria-disabled={isPending}
        isLoading={isPending}
        color="primary"
        type="submit"
      >
        Reset
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </Form>
  );
}
