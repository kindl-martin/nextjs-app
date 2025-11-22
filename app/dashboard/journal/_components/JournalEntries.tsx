'use client';

import { journal } from '@/app/generated/prisma';
import { use } from 'react';
import { Card } from '@heroui/card';
import { FadeUp } from '@/app/ui/animate/fadeUp';
import { format } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteJournalEntry } from '@/app/dashboard/journal/actions';

export default function JournalEntries({
  journalEntries: journalEntriesPromise,
}: {
  journalEntries: Promise<journal[]>;
}) {
  const journalEntries = use(journalEntriesPromise);

  return (
    <>
      {journalEntries.map(({ id, created_at, title, message }) => (
        <FadeUp key={id}>
          <Card title={title} className="p-4">
            <div className="flex justify-between">
              <h2 className="mb-2 text-xl font-bold">{title}</h2>
              <TrashIcon
                className="h-4 w-4"
                onClick={() => deleteJournalEntry(id)}
              />
            </div>
            <time dateTime={created_at.toString()}>
              {format(created_at, 'LLLL d, yyyy HH:mm')}
            </time>
            <p>{message}</p>
          </Card>
        </FadeUp>
      ))}
    </>
  );
}
