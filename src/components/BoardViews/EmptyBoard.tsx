import { useContext } from "react";
import { ButtonPrimaryL } from "@/components/Buttons/MainButtons";
import { ModalContext } from "@/context/ModalContext";
import { AddColumnForm } from "@/components/ModalWindow/AddColumn";

export function EmptyBoard({ boardId }: { boardId: string }) {
  const { handleModal } = useContext(ModalContext);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h4 className="text-heading-l text-medium-gray">
          This board is empty. Create a new column to get started.
        </h4>
        <div className="w-fit ">
          <ButtonPrimaryL
            onClick={() => handleModal(<AddColumnForm boardId={boardId} />)}
          >
            + Add New Column
          </ButtonPrimaryL>
        </div>
      </div>
    </div>
  );
}
