import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { AddColumnForm } from "@/components/ModalWindow/AddColumnForm";

export function NewColumnButton({ boardId }: { boardId: string }) {
  const { handleModal } = useContext(ModalContext);

  return (
    <button
      onClick={() => handleModal(<AddColumnForm boardId={boardId} />)}
      className="flex items-center 
    justify-center rounded-md 
    bg-gradient-to-b from-gradient-light-gray-start to-gradient-light-gray-end dark:from-gradient-dark-gray-start dark:to-gradient-dark-gray-end"
    >
      <p className="text-heading-xl text-medium-gray">+ New Column</p>
    </button>
  );
}
