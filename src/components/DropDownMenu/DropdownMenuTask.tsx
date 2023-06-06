import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { DropdownMenuItem } from "@/components/DropDownMenu/DropdownMenuItem";
import { EditTask } from "../ModalWindow/EditTask";
import { DeleteTask } from "../ModalWindow/DeleteDialogs/DeleteTask";

export function DropdownEditTaskItem({ taskId }: { taskId: string }) {
  const { handleModal } = useContext(ModalContext);
  const handleEditTask = () => {
    handleModal((<EditTask taskId={taskId} />) as React.ReactNode);
  };

  const title = "Edit task";
  return (
    <DropdownMenuItem
      title={title}
      destructive={false}
      onClick={handleEditTask}
    />
  );
}

export function DropdownDeleteTaskItem({
  taskId,
  taskName,
  boardId,
  columnId,
}: {
  taskId: string;
  taskName: string;
  boardId: string;
  columnId: string;
}) {
  const { handleModal } = useContext(ModalContext);
  const handleDeleteTask = () => {
    handleModal(
      (
        <DeleteTask
          taskId={taskId}
          taskName={taskName}
          boardId={boardId}
          columnId={columnId}
        />
      ) as React.ReactNode
    );
  };

  const title = "Delete task";
  return (
    <DropdownMenuItem
      title={title}
      destructive={true}
      onClick={handleDeleteTask}
    />
  );
}
