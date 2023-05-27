import { type Column } from "@/utils/DataTypes";
import { TaskCard } from "@/components/TaskCard";

export function TaskColumn({ column }: { column: Column }) {
  return (
    <div className="flex flex-col gap-6 overflow-auto">
      <ColumnTitle column={column} />
      <div className="flex flex-col gap-5 ">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.title}
            title={task.title}
            subtasks={task.subtasks}
          />
        ))}
      </div>
    </div>
  );
}

export function ColumnTitle({ column }: { column: Column }) {
  const title = `${column.name} (${column.tasks.length})`;

  const bgColor = column.color ? column.color : "bg-light-gray";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-[0.9375rem] w-[0.9375rem] rounded-full`}
        style={{ backgroundColor: bgColor }}
      ></div>
      <h3 className="text-heading-s font-bold uppercase text-medium-gray">
        {title}
      </h3>
    </div>
  );
}
