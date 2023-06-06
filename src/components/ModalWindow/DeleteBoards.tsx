import { useContext } from "react";
import { ButtonDestructive, ButtonSecondary } from "../Buttons/MainButtons";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { ModalContext } from "@/context/ModalContext";
import { useBoardsDispatch } from "@/context/BoardsContext";

type BoardDeleteDialogProps = {
  boardId: string;
  boardName: string;
};

type TaskDeleteDialogProps = {
  boardId: string;
  columnId: string;
  taskId: string;
  taskName: string;
};

export function DestructiveDialog({
  title,
  description,
  handleDelete,
}: {
  title: string;
  description: string;
  handleDelete: () => void;
}) {
  const { handleModal } = useContext(ModalContext);
  return (
    <>
      <ModalWindowTitle title={title} destructive={true} />
      <p>{description}</p>
      <div className="flex gap-4">
        <ButtonDestructive
          onClick={() => {
            handleDelete();
            handleModal();
          }}
        >
          Delete
        </ButtonDestructive>
        <ButtonSecondary onClick={() => handleModal()}>Cancel</ButtonSecondary>
      </div>
    </>
  );
}

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

export function DeleteTask({
  boardId,
  columnId,
  taskId,
  taskName,
}: TaskDeleteDialogProps) {
  const dispatch = useBoardsDispatch();
  const handleDelete = () => {
    if (!dispatch) return;
    dispatch({
      type: "DELETE_TASK",
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    });
  };
  const title = "Delete this task?";
  const description = `Are you sure you want to delete the '${taskName}'
   task and its subtasks? This action cannot be reversed.`;

  return (
    <DestructiveDialog
      handleDelete={handleDelete}
      title={title}
      description={description}
    />
  );
}
