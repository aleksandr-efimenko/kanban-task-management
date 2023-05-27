import { type Column } from "@/utils/DataTypes";
import { TaskCard } from "@/components/TaskCard";

export function TaskColumn({ column }: { column: Column }) {
  return (
    <div className="flex flex-col gap-5 overflow-auto">
      {column.tasks.map((task) => (
        <TaskCard
          key={task.title}
          title={task.title}
          subtasks={task.subtasks}
        />
      ))}
    </div>
  );
}
