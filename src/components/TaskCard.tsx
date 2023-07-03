import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { TaskView } from "./ModalWindow/TaskView";
import { generateSubtasksDescription } from "@/utils/SubtasksTitle";
import { type Subtask } from "@prisma/client";

export type TaskCardProps = {
  taskId: string;
  title: string;
  subtasks: Subtask[];
};

export function TaskCard({ taskId, title: name, subtasks }: TaskCardProps) {
  const { handleModal } = useContext(ModalContext);
  const handleOpenTask = () => {
    handleModal(<TaskView taskId={taskId} />);
  };

  const subtasksDescription = generateSubtasksDescription(subtasks);
  return (
    <div
      className="cursor-pointer rounded-lg bg-white px-4 py-6 shadow-task-card-shadow 
    duration-200 hover:bg-purple hover:bg-opacity-20 dark:bg-dark-gray  dark:hover:bg-purple dark:hover:bg-opacity-20"
      onClick={handleOpenTask}
    >
      <h3 className="text-heading-m">{name}</h3>
      <p className="mt-2 text-body-m text-medium-gray">{subtasksDescription}</p>
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="rounded-lg bg-white px-4 py-6 shadow-task-card-shadow dark:bg-dark-gray">
      <div className="h-5 w-1/2 animate-pulse rounded bg-light-gray  "></div>
      <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-light-gray "></div>
    </div>
  );
}
