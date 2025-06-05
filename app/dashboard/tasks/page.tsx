import { auth } from '@/auth';
import CreateTaskForm from '@/app/ui/tasks/form';
import { TasksLoaderSkeleton } from '@/app/ui/tasks/loader';
import { Suspense } from 'react';
import { prisma } from '@/app/lib/db';
import { TaskList } from '@/app/ui/tasks/task';

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  const tasks = prisma.tasks.findMany({
    where: { user_id: session?.user?.id },
    orderBy: { position: 'desc' },
    include: {
      timer: true,
    },
  });

  return (
    <main>
      {userId && <CreateTaskForm userId={userId} />}
      <Suspense fallback={<TasksLoaderSkeleton />}>
        <TaskList tasks={tasks} />;
      </Suspense>
    </main>
  );
}
