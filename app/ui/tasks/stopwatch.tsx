'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/app/ui/time';
import { Button } from '@heroui/button';
import { startTimer, stopTimer } from '@/app/ui/tasks/actions';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import { timer } from '@/app/generated/prisma';

export function Stopwatch({
  timer,
  totalTime,
  taskId,
}: {
  timer?: timer;
  totalTime: number;
  taskId: string;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = new Date(timer?.start || '').getTime();

    const updateElapsed = () => {
      const now = Date.now();
      setElapsed(Math.floor((now - start) / 1000)); // in seconds
    };

    updateElapsed();

    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      {timer ? (
        <span>{formatTime(totalTime + elapsed)}</span>
      ) : (
        <p>{formatTime(totalTime)}</p>
      )}
      {timer ? (
        <Button
          variant="ghost"
          onPress={() => stopTimer(timer.id)}
          startContent={<PauseIcon className="h-4 w-4" />}
        />
      ) : (
        <Button
          variant="ghost"
          onPress={() => startTimer(taskId)}
          endContent={<PlayIcon className="h-4 w-4" />}
        />
      )}
    </>
  );
}
