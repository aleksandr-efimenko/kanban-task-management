import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { DropdownMenuItem } from "@/components/DropDownMenu/DropdownMenuItem";
import { DeleteTask } from "../ModalWindow/DeleteDialogs/DeleteTask";
import EditTask from "../ModalWindow/EditTask";
import { TaskViewDropdownMenuContext } from "@/context/TaskViewDropdownMenuContext";
import { TaskView } from "../ModalWindow/TaskView";

export function DropdownEditTaskItem({ taskId }: { taskId: string }) {
  const { handleModal } = useContext(ModalContext);
  const { handleMenu } = useContext(TaskViewDropdownMenuContext);
  const handleEditTask = () => {
    handleMenu(false);
    handleModal((<EditTask taskId={taskId} />) as React.ReactNode, true);
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
  const { handleMenu } = useContext(TaskViewDropdownMenuContext);

  const handleCancelDelete = () => {
    handleModal((<TaskView taskId={taskId} />) as React.ReactNode, true);
  };

  const handleDeleteTask = () => {
    //close menu
    handleMenu(false);
    // open modal
    handleModal(
      (
        <DeleteTask taskId={taskId} handleCancel={handleCancelDelete} />
      ) as React.ReactNode,
      true
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
