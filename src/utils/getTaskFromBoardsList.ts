import { type Board } from "@/utils/DataTypes";

export function getColumnByTaskId(
  taskId: string,
  boards: Board[]
): string | undefined {
  const board = boards.find((board) =>
    board.columns.find((column) =>
      column.tasks.find((task) => task.id === taskId)
    )
  );
  const column = board?.columns.find((column) =>
    column.tasks.find((task) => task.id === taskId)
  );

  return column?.id;
}

export function getBoardByTaskId(
  taskId: string,
  boards: Board[]
): string | undefined {
  const board = boards.find((board) =>
    board.columns.find((column) =>
      column.tasks.find((task) => task.id === taskId)
    )
  );
  return board?.id;
}
