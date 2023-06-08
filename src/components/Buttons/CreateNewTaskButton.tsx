import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { ButtonPrimaryL } from "./MainButtons";
import AddTask from "../ModalWindow/AddTask";

export function CreateNewTaskButton({ boardId }: { boardId: string }) {
  const { handleModal } = useContext(ModalContext);

  const handleCreateTask = () => {
    handleModal((<AddTask boardId={boardId} />) as React.ReactNode);
  };

  return (
    <ButtonPrimaryL onClick={handleCreateTask}>+ Add new Task</ButtonPrimaryL>
  );
}
