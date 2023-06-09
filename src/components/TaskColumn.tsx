import { TaskCard, TaskCardSkeleton } from "@/components/TaskCard";
import { type Column } from "@prisma/client";

export function TaskColumn({ column }: { column: Column }) {
  return (
    <div className="no-scrollbar flex flex-col gap-6 overflow-auto">
      <ColumnTitle column={column} />
      <div className="flex flex-col gap-5 ">
        {column.tasks.map((task) => (
          <TaskCard
            taskId={task.id}
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
      <h3 className="w-full text-heading-s font-bold uppercase text-medium-gray">
        {title}
      </h3>
    </div>
  );
}

export function TaskColumnSkeleton() {
  return (
    <div className="flex flex-col gap-6 overflow-auto">
      <div className="h-5 w-1/2 animate-pulse rounded bg-light-gray "></div>
      <div className="flex flex-col gap-5 ">
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
      </div>
    </div>
  );
}
