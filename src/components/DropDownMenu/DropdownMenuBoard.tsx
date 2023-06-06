import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { DropdownMenuItem } from "@/components/DropDownMenu/DropdownMenuItem";
import { EditBoard } from "@/components/ModalWindow/EditBoard";
import { DeleteBoard } from "@/components/ModalWindow/DeleteDialogs/DeleteBoard";
import { useBoards } from "@/context/BoardsContext";

export function DropdownEditBoardItem({ boardId }: { boardId: string }) {
  const { handleModal } = useContext(ModalContext);
  const handleEditBoard = () => {
    handleModal((<EditBoard boardId={boardId} />) as React.ReactNode);
  };

  const title = "Edit board";
  return (
    <DropdownMenuItem
      title={title}
      destructive={false}
      onClick={handleEditBoard}
    />
  );
}

export function DropdownDeleteBoardItem({ boardId }: { boardId: string }) {
  const boards = useBoards();
  const boardName = boards?.find((board) => board.id === boardId)?.name || "";
  const { handleModal } = useContext(ModalContext);
  const handleDeleteBoard = () => {
    handleModal(
      (
        <DeleteBoard boardId={boardId} boardName={boardName} />
      ) as React.ReactNode
    );
  };

  const title = "Delete board";
  return (
    <DropdownMenuItem
      title={title}
      destructive={true}
      onClick={handleDeleteBoard}
    />
  );
}
