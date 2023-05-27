import { type Subtask } from "@/utils/DataTypes";

export function TaskCard({
  title,
  subtasks,
}: {
  title: string;
  subtasks: Subtask[];
}) {
  const subtasksNumber = subtasks.length;
  const subtasksDone = subtasks.filter((subtask) => subtask.isCompleted).length;
  return (
    <div className="rounded-lg bg-white px-4 py-6 shadow-task-card-shadow dark:bg-dark-gray">
      <h3 className="text-heading-m">{title}</h3>
      <p className="mt-2 text-body-m text-medium-gray">
        {subtasksDone} of {subtasksNumber} subtasks
      </p>
    </div>
  );
}
