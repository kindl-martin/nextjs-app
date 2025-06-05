'use client';

import { Checkbox } from '@heroui/checkbox';
import { Card } from '@heroui/card';
import { task_state, tasks, timer } from '@/app/generated/prisma';
import {
  deleteTask,
  orderTasks,
  toggleTaskState,
} from '@/app/ui/tasks/actions';
import { Stopwatch } from '@/app/ui/tasks/stopwatch';
import { getTotalTime } from '@/app/ui/time';
import { use, useEffect, useRef } from 'react';
import { createSwapy, type Swapy } from 'swapy';
import clsx from 'clsx';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';

export function Task({ task }: { task: tasks & { timer: timer[] } }) {
  const openTimer = task.timer.find((t) => !t.end);
  const totalTime = getTotalTime(task.timer);
  const isDone = task.state === task_state.DONE;

  return (
    <Card
      className="flex-row items-center justify-between gap-2 p-5"
      key={task.id}
    >
      <EllipsisVerticalIcon
        data-swapy-handle={task.id}
        className="h-5 w-5 flex-shrink-0 cursor-grab"
      />
      <Checkbox
        size="lg"
        isSelected={isDone}
        onValueChange={() =>
          toggleTaskState(task.id, isDone ? task_state.OPEN : task_state.DONE)
        }
      />
      <h3 className={clsx('flex-grow', { 'line-through': isDone })}>
        {task.name}
      </h3>
      <Stopwatch timer={openTimer} totalTime={totalTime} taskId={task.id} />
      <Button
        onPress={() => deleteTask(task.id)}
        startContent={<TrashIcon className="h-4 w-4" />}
        variant="ghost"
      />
    </Card>
  );
}

export function TaskList({
  tasks,
}: {
  tasks: Promise<(tasks & { timer: timer[] })[]>;
}) {
  const swapy = useRef<Swapy | null>(null);
  const container = useRef<HTMLDivElement>(null);

  const allTasks = use(tasks);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);

      swapy.current.onSwap(async (event) => {
        await orderTasks(event);
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, [tasks]);

  return (
    <section className="mt-10 flex flex-col gap-4" ref={container}>
      {allTasks.map((task) => (
        <div data-swapy-slot={task.id} key={task.id}>
          <div data-swapy-item={task.id} key={task.id}>
            <Task task={task} />
          </div>
        </div>
      ))}
    </section>
  );
}
