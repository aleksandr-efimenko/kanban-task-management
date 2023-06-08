import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { DropdownMenuItem } from "@/components/DropDownMenu/DropdownMenuItem";
import { EditTask } from "../ModalWindow/EditTask";
import { DeleteTask } from "../ModalWindow/DeleteDialogs/DeleteTask";
import { useBoards } from "@/context/BoardsContext";

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

export function DropdownDeleteTaskItem({ taskId }: { taskId: string }) {
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();

  const handleDeleteTask = () => {
    handleModal((<DeleteTask taskId={taskId} />) as React.ReactNode);
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
