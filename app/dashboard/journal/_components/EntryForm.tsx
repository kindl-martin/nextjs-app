'use client';

import { Form } from '@heroui/form';
import { DatePicker } from '@heroui/date-picker';
import { Radio, RadioGroup } from '@heroui/radio';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { useActionState } from 'react';
import { ErrorState } from '@/app/lib/types';
import { addToast } from '@heroui/toast';
import { createJournalEntry } from '@/app/dashboard/journal/actions';

export default function EntryForm() {
  const [, formAction, isPending] = useActionState(
    async (prevState: ErrorState | undefined, formData: FormData) => {
      const response = await createJournalEntry(prevState, formData);
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
    <Form className="space-y-3" action={formAction}>
      <DatePicker aria-label="Select a date" isRequired />
      <RadioGroup orientation="horizontal" isRequired>
        <Radio value="work">Work</Radio>
        <Radio value="learning">Learning</Radio>
        <Radio value="interestingThing">Interesting thing</Radio>
      </RadioGroup>
      <Input name="title" placeholder="Title" required />
      <Textarea name="message" required placeholder="Type your entry here..." />
      <Button
        type="submit"
        className="mt-5 w-full"
        color="primary"
        isLoading={isPending}
      >
        Submit
      </Button>
    </Form>
  );
}
