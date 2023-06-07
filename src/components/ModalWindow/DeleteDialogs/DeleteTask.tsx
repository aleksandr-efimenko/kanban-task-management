import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { DestructiveDialog } from "@/components/ModalWindow/DeleteDialogs/DeleteDialog";

export function DeleteTask({ taskId }: { taskId: string }) {
  const dispatch = useBoardsDispatch();
  const boards = useBoards();
  if (!dispatch || !boards) return null;

  const boardId = boards?.find((board) =>
    board.columns.find((column) =>
      column.tasks.find((task) => task.id === taskId)
    )
  )?.id;
  const columnId = boards
    .find((board) =>
      board.columns.find((column) =>
        column.tasks.find((task) => task.id === taskId)
      )
    )
    ?.columns.find((column) =>
      column.tasks.find((task) => task.id === taskId)
    )?.id;

  const taskTitle = boards
    .find((board) =>
      board.columns.find((column) =>
        column.tasks.find((task) => task.id === taskId)
      )
    )
    ?.columns.find((column) => column.tasks.find((task) => task.id === taskId))
    ?.tasks.find((task) => task.id === taskId)?.title as string;

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      boardId: boardId || "",
      columnId: columnId || "",
      taskId: taskId,
    });
  };
  const title = "Delete this task?";
  const description = `Are you sure you want to delete the '${taskTitle}'
     task and its subtasks? This action cannot be reversed.`;

  return (
    <DestructiveDialog
      handleDelete={handleDelete}
      title={title}
      description={description}
    />
  );
}
