import { Card } from '@heroui/card';
import EntryForm from './_components/EntryForm';
import { Suspense } from 'react';
import { Skeleton } from '@heroui/skeleton';
import { prisma } from '@/app/lib/db';
import JournalEntries from './_components/JournalEntries';

export default function Page() {
  const journalEntries = prisma.journal.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="mb-2 text-center text-4xl font-bold">Work Journal</h1>
      <p className="mb-10 text-center text-base font-medium text-neutral-500">
        Log time spend working.
      </p>
      <Card className="p-5">
        <h2 className="mb-5 font-bold text-neutral-500">New Entry</h2>
        <EntryForm />
      </Card>
      <section className="mt-5 mb-10 space-y-5">
        <Suspense fallback={<Skeleton className="h-64 w-96 rounded-2xl" />}>
          <JournalEntries journalEntries={journalEntries} />
        </Suspense>
      </section>
    </section>
  );
}
