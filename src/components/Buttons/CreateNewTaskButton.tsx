import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { ButtonPrimaryL } from "./MainButtons";
import AddTaskForm from "../ModalWindow/AddTask";

export function CreateNewTaskButton({ boardId }: { boardId: string }) {
  const { handleModal } = useContext(ModalContext);

  const handleCreateTask = () => {
    handleModal((<AddTaskForm boardId={boardId} />) as React.ReactNode);
  };

  return (
    <div>
      <ButtonPrimaryL onClick={handleCreateTask}>+ Add new Task</ButtonPrimaryL>
    </div>
  );
}
