'use client';

import { journal } from '@/app/generated/prisma';
import { use } from 'react';
import { Card } from '@heroui/card';
import { FadeUp } from '@/app/ui/animate/fadeUp';
import { format } from 'date-fns';

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
            <time dateTime={created_at.toString()}>
              {format(created_at, 'LLLL d, yyyy HH:mm')}
            </time>
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <p>{message}</p>
          </Card>
        </FadeUp>
      ))}
    </>
  );
}
