import { ModalContext } from "@/context/ModalContext";
import { type Subtask } from "@/utils/DataTypes";
import { useContext } from "react";
import { TaskView } from "./ModalWindow/TaskView";
import { generateSubtasksDescription } from "@/utils/SubtasksTitle";

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
