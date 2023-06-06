import { useBoardsDispatch } from "@/context/BoardsContext";
import { DestructiveDialog } from "@/components/ModalWindow/DeleteDialogs/DeleteDialog";

type BoardDeleteDialogProps = {
  boardId: string;
  boardName: string;
};

export function DeleteBoard({ boardId, boardName }: BoardDeleteDialogProps) {
  const dispatch = useBoardsDispatch();
  const handleDelete = () => {
    if (!dispatch) return;
    dispatch({ type: "DELETE_BOARD", boardId: boardId });
  };
  const title = "Delete this board?";
  const description = `Are you sure you want to delete the ‘${boardName}’ board? 
    This action will remove all columns and tasks and cannot be reversed.`;

  return (
    <DestructiveDialog
      handleDelete={handleDelete}
      title={title}
      description={description}
    />
  );
}
