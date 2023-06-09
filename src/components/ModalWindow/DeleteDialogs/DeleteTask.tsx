import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { DestructiveDialog } from "@/components/ModalWindow/DeleteDialogs/DeleteDialog";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function DeleteTask({
  taskId,
  handleCancel,
}: {
  taskId: string;
  handleCancel: () => void;
}) {
  const dispatch = useBoardsDispatch();
  const { boards } = useBoards();
  const { data: session } = useSession();
  if (!dispatch || !boards) return null;

  const taskTitle = boards
    .find((board) =>
      board.columns.find((column) =>
        column.tasks.find((task) => task.id === taskId)
      )
    )
    ?.columns.find((column) => column.tasks.find((task) => task.id === taskId))
    ?.tasks.find((task) => task.id === taskId)?.title as string;
  const deleteTaskMutation = api.tasks.deleteTask.useMutation();
  const handleDelete = async () => {
    //delete task from db if user is logged in
    if (session) await deleteTaskMutation.mutateAsync({ id: taskId });
    dispatch({
      type: "DELETE_TASK",
      taskId: taskId,
    });
  };
  const title = "Delete this task?";
  const description = `Are you sure you want to delete the '${taskTitle}'
     task and its subtasks? This action cannot be reversed.`;

  return (
    <>
      <DestructiveDialog
        handleDelete={() => {
          void handleDelete();
        }}
        title={title}
        description={description}
        handleCancel={handleCancel}
      />
      {deleteTaskMutation.isLoading && <LoadingSpinner />}
    </>
  );
}
