import { useBoardsDispatch } from "@/context/BoardsContext";
import { DestructiveDialog } from "@/components/ModalWindow/DeleteDialogs/DeleteDialog";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { api } from "@/utils/api";
import { router } from "@trpc/server";
import { useRouter } from "next/router";

type BoardDeleteDialogProps = {
  boardId: string;
  boardName: string;
};

export function DeleteBoard({ boardId, boardName }: BoardDeleteDialogProps) {
  const router = useRouter();
  const dispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const deleteBoardMutation = api.boards.deleteBoard.useMutation();
  const handleDelete = () => {
    if (!dispatch) return;
    deleteBoardMutation.mutate({ id: boardId });
    dispatch({ type: "DELETE_BOARD", boardId: boardId });
    void router.push(`/`);
  };
  const title = "Delete this board?";
  const description = `Are you sure you want to delete the ‘${boardName}’ board? 
    This action will remove all columns and tasks and cannot be reversed.`;

  return (
    <DestructiveDialog
      handleDelete={handleDelete}
      title={title}
      description={description}
      handleCancel={handleModal}
    />
  );
}
