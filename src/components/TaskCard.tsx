import { type Subtask } from "@/utils/DataTypes";

export default function TaskCard({
  title,
  subtasks,
}: {
  title: string;
  subtasks: Subtask[];
}) {
  const subtasksNumber = subtasks.length;
  const subtasksDone = subtasks.filter((subtask) => subtask.isCompleted).length;
  return (
    <div className="bg-medium-gray">
      <h3 className="text-heading-m">{title}</h3>
      <p className="mt-2 text-body-m">
        {subtasksDone} of {subtasksNumber} subtasks
      </p>
    </div>
  );
}
