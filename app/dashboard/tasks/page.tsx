import { auth } from '@/auth';
import CreateTaskForm from '@/app/ui/tasks/form';
import { TasksLoader, TasksLoaderSkeleton } from '@/app/ui/tasks/loader';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <main>
      {userId && <CreateTaskForm userId={userId} />}
      <Suspense fallback={<TasksLoaderSkeleton />}>
        <TasksLoader session={session} />
      </Suspense>
    </main>
  );
}
