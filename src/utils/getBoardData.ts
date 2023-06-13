import { type Task, type Board } from "@/utils/DataTypes";

export function getColumnIdByTaskId(
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

export function getBoardIdByTaskId(
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

export function getTaskInfoFromId(
  taskId: string,
  boards: Board[]
): Task | undefined {
  const taskBoardId = getBoardIdByTaskId(taskId, boards);
  const taskColumnId = getColumnIdByTaskId(taskId, boards);
  const task = boards
    .find((board) => board.id === taskBoardId)
    ?.columns.find((column) => column.id === taskColumnId)
    ?.tasks.find((task) => task.id === taskId);
  return task;
}

export function getTaskIdFromSubtask(subtaskId: string, boards: Board[]) {
  const task = boards
    .find((board) =>
      board.columns.find((column) =>
        column.tasks.find((task) =>
          task.subtasks.find((subtask) => subtask.id === subtaskId)
        )
      )
    )
    ?.columns.find((column) =>
      column.tasks.find((task) =>
        task.subtasks.find((subtask) => subtask.id === subtaskId)
      )
    )
    ?.tasks.find((task) =>
      task.subtasks.find((subtask) => subtask.id === subtaskId)
    );
  return task?.id;
}

export function getBoardDataFromTaskId(
  taskId: string,
  boards: Board[]
): Board | undefined {
  const board = boards.find((board) =>
    board.columns.find((column) =>
      column.tasks.find((task) => task.id === taskId)
    )
  );
  return board;
}
