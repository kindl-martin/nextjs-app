import { Skeleton } from '@heroui/skeleton';
import { Card } from '@heroui/card';

export function TasksLoaderSkeleton() {
  return (
    <section className="mt-10 flex flex-col gap-4">
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          className="flex-col items-start justify-between gap-2 p-5"
        >
          <Skeleton className="h-5 w-full rounded-xl" />
          <Skeleton className="h-5 w-1/2 rounded-xl" />
        </Card>
      ))}
    </section>
  );
}
