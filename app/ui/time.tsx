import { timer } from '../generated/prisma';

export const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export function getTotalTime(timers: timer[]): number {
  return (
    timers.reduce((total, timer) => {
      const start = new Date(timer.start).getTime();
      const end = timer.end ? new Date(timer.end).getTime() : Date.now();

      return total + Math.max(0, end - start);
    }, 0) / 1000
  );
}
