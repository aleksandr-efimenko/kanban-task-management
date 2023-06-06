import { useBoardsDispatch } from "@/context/BoardsContext";
import { DestructiveDialog } from "@/components/ModalWindow/DeleteDialogs/DeleteDialog";

type TaskDeleteDialogProps = {
  boardId: string;
  columnId: string;
  taskId: string;
  taskName: string;
};

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
