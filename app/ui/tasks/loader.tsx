import { prisma } from '@/app/lib/db';
import { Session } from 'next-auth';
import { TaskList } from '@/app/ui/tasks/task';
import { Skeleton } from '@heroui/skeleton';
import { Card } from '@heroui/card';

export async function TasksLoader({ session }: { session: Session | null }) {
  const tasks = await prisma.tasks.findMany({
    where: { user_id: session?.user?.id },
    orderBy: { position: 'desc' },
    include: {
      timer: true,
    },
  });

  return <TaskList tasks={tasks} />;
}

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
