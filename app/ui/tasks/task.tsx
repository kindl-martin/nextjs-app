"use client";

import { Checkbox } from "@heroui/checkbox";
import { Card } from "@heroui/card";
import { task_state, tasks, timer } from "@/app/generated/prisma";
import {
  deleteTask,
  orderTasks,
  toggleTaskState,
} from "@/app/ui/tasks/actions";
import { Stopwatch } from "@/app/ui/tasks/stopwatch";
import { getTotalTime } from "@/app/ui/time";
import { use, useEffect, useState } from "react";
import clsx from "clsx";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Reorder, useDragControls } from "framer-motion";
import { useDisclosure } from "@heroui/use-disclosure";

export function TaskList({
  tasks,
}: {
  tasks: Promise<(tasks & { timer: timer[] })[]>;
}) {
  const initialTasks = use(tasks);
  const [taskList, setTaskList] = useState(initialTasks);

  useEffect(() => {
    setTaskList(initialTasks);
  }, [initialTasks]);

  return (
    <Reorder.Group
      axis="y"
      values={taskList}
      onReorder={(newOrder) => {
        void orderTasks(newOrder);
        setTaskList(newOrder);
      }}
      className="mt-10 flex flex-col gap-4"
    >
      {taskList.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </Reorder.Group>
  );
}

export function Task({ task }: { task: tasks & { timer: timer[] } }) {
  const openTimer = task.timer.find((t) => !t.end);
  const totalTime = getTotalTime(task.timer);
  const isDone = task.state === task_state.DONE;

  const controls = useDragControls();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Reorder.Item value={task} dragListener={false} dragControls={controls}>
      <Card
        className="flex-row items-center justify-between gap-2 p-5"
        key={task.id}
      >
        <EllipsisVerticalIcon
          onPointerDown={(e) => controls.start(e)}
          className="h-5 w-5 shrink-0 cursor-grab"
        />
        <Checkbox
          size="lg"
          isSelected={isDone}
          onValueChange={() =>
            toggleTaskState(task.id, isDone ? task_state.OPEN : task_state.DONE)
          }
        />
        <h3 className={clsx("grow", { "line-through": isDone })}>
          {task.name}
        </h3>
        <Stopwatch timer={openTimer} totalTime={totalTime} taskId={task.id} />
        <Button
          onPress={onOpen}
          startContent={<TrashIcon className="h-4 w-4" />}
          variant="ghost"
        />
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete task
                </ModalHeader>
                <ModalBody>Are you sure you want to delete the task?</ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Cancel</Button>
                  <Button color="danger" onPress={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Card>
    </Reorder.Item>
  );
}
