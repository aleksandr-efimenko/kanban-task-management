import { uuid } from "uuidv4";
import {
  DropdownDeleteBoardItem,
  DropdownEditBoardItem,
} from "./DropdownMenuBoard";
import {
  DropdownDeleteTaskItem,
  DropdownEditTaskItem,
} from "./DropdownMenuTask";

export function DropdownMenu({ buttons }: { buttons: JSX.Element[] }) {
  return (
    <div
      className="absolute -left-[11.5rem] top-14 flex w-48 flex-col rounded-lg bg-white 
    py-4 dark:bg-very-dark-gray"
    >
      {buttons}
    </div>
  );
}

export function BoardDropDownMenu({ boardId }: { boardId: string }) {
  const buttons = [
    <DropdownEditBoardItem boardId={boardId} key={uuid()} />,
    <DropdownDeleteBoardItem boardId={boardId} key={uuid()} />,
  ];
  return <DropdownMenu buttons={buttons} />;
}

export function TaskDropDownMenu({
  taskId,
  boardId,
  columnId,
  taskName,
}: {
  taskId: string;
  boardId: string;
  columnId: string;
  taskName: string;
}) {
  const buttons = [
    <DropdownEditTaskItem taskId={taskId} key={uuid()} />,
    <DropdownDeleteTaskItem
      taskId={taskId}
      key={uuid()}
      boardId={boardId}
      columnId={columnId}
      taskName={taskName}
    />,
  ];
  return <DropdownMenu buttons={buttons} />;
}
