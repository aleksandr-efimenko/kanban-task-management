import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type Reducer,
} from "react";
import defaultBoardsData from "@/data/defaultBoard.json";
import type { Task, Board } from "@/utils/DataTypes";
import { uuid } from "uuidv4";
import { type BoardActions, neverReached } from "@/context/BoardActions";
import { generateColor } from "@/utils/generateColor";
import {
  getBoardDataFromTaskId,
  getBoardIdByTaskId,
  getColumnIdByTaskId,
  getTaskIdFromSubtask,
} from "@/utils/getBoardData";
import { addBoardDispatch, editBoardDispatch } from "./BoardDispatchFunctions";

const initialBoards = defaultBoardsData.boards;
const boardsWithIds: Board[] = initialBoards.map((board) => ({
  ...board,
  id: uuid(),
  columns: board.columns.map((column) => ({
    ...column,
    id: uuid(),
    tasks: column.tasks.map((task) => ({
      ...task,
      id: uuid(),
      subtasks: task.subtasks.map((subtask) => ({
        ...subtask,
        id: uuid(),
      })),
    })),
  })),
}));

const BoardsContext = createContext<Board[] | null>(null);
export const BoardsDispatchContext =
  createContext<Dispatch<BoardActions> | null>(null);

export function BoardsProvider({ children }: { children: React.ReactNode }) {
  const [boards, dispatch] = useReducer<Reducer<Board[], BoardActions>>(
    boardsReducer,
    boardsWithIds
  );

  return (
    <BoardsContext.Provider value={boards}>
      <BoardsDispatchContext.Provider value={dispatch}>
        {children}
      </BoardsDispatchContext.Provider>
    </BoardsContext.Provider>
  );
}

export function useBoards() {
  return useContext(BoardsContext);
}

export function useBoardsDispatch() {
  return useContext(BoardsDispatchContext);
}

function boardsReducer(boards: Board[], action: BoardActions): Board[] {
  switch (action.type) {
    case "ADD_BOARD": {
      return addBoardDispatch(boards, action);
    }
    case "EDIT_BOARD": {
      return editBoardDispatch(boards, action);
    }
    case "DELETE_BOARD": {
      const newBoards = boards.filter((board) => board.id !== action.boardId);
      return newBoards;
    }
    case "ADD_COLUMN": {
      const newBoards = boards.map((board) => {
        if (board.id === action.boardId) {
          return {
            ...board,
            columns: [
              ...board.columns,
              {
                id: action.newColumnId,
                name: action.columnName,
                color: action.color,
                tasks: [] as Task[],
              },
            ],
          };
        }
        return board;
      });
      return newBoards;
    }
    case "ADD_TASK": {
      const subtasks = action.subtasks ? action.subtasks : [];
      const newBoards = boards.map((board) => {
        if (board.id === action.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === action.columnId) {
                return {
                  ...column,
                  tasks: [
                    ...column.tasks,
                    {
                      id: action.taskId,
                      title: action.title,
                      description: action.description,
                      status: column.name,
                      subtasks: subtasks,
                    } as Task,
                  ],
                };
              }
              return column;
            }),
          };
        }
        return board;
      });
      return newBoards;
    }

    case "EDIT_TASK": {
      const boardId = getBoardIdByTaskId(action.taskId, boards);
      const columnId = getColumnIdByTaskId(action.taskId, boards);
      const newBoards = boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tasks: column.tasks.map((task) => {
                    if (task.id === action.taskId) {
                      return {
                        ...task,
                        title: action.newTaskName,
                        description: action.newTaskDescription,
                        subtasks: action.newSubtasks,
                      };
                    }
                    return task;
                  }),
                };
              }
              return column;
            }),
          };
        }
        return board;
      });
      return newBoards;
    }

    case "DELETE_TASK": {
      const boardId = getBoardIdByTaskId(action.taskId, boards);
      const columnId = getColumnIdByTaskId(action.taskId, boards);
      const newBoards = boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tasks: column.tasks.filter(
                    (task) => task.id !== action.taskId
                  ),
                };
              }
              return column;
            }),
          };
        }
        return board;
      });
      return newBoards;
    }

    case "CHANGE_TASK_STATUS": {
      const { taskId, newStatus } = action;
      const board = getBoardDataFromTaskId(taskId, boards);
      const previousColumnId = getColumnIdByTaskId(taskId, boards);

      if (!board || !previousColumnId) {
        return boards;
      }

      const newColumn = board.columns.find(
        (column) => column.name === newStatus
      );
      // if the new column doesn't exist, do nothing
      if (!newColumn) {
        return boards;
      }
      // if the task is already in the new column, do nothing
      if (previousColumnId === newColumn.id) {
        return boards;
      }

      const updatedBoards = boards.map((board) => {
        if (board.id !== board.id) {
          return board;
        }

        const updatedColumns = board.columns.map((column) => {
          if (column.id === newColumn.id) {
            // find the task in the previous column
            const task = board.columns
              .find((column) => column.id === previousColumnId)
              ?.tasks.find((task) => task.id === taskId);

            if (!task) {
              return column;
            }
            // add the task to the new column
            return {
              ...column,
              tasks: [{ ...task, status: newStatus }, ...column.tasks],
            };
          }
          // remove the task from the previous column
          if (column.id === previousColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            };
          }

          return column;
        });

        return { ...board, columns: updatedColumns };
      });

      return updatedBoards;
    }
    case "EDIT_SUBTASK": {
      const taskId = getTaskIdFromSubtask(action.id, boards);
      if (!taskId) return boards;
      const boardId = getBoardIdByTaskId(taskId, boards);
      if (!boardId) return boards;
      const columnId = getColumnIdByTaskId(taskId, boards);
      if (!columnId) return boards;

      const newBoards = boards.map((board) => {
        if (board.id !== boardId) {
          return board;
        }

        const newColumns = board.columns.map((column) => {
          if (column.id !== columnId) {
            return column;
          }

          const newTasks = column.tasks.map((task) => {
            if (task.id !== taskId) {
              return task;
            }

            const newSubtasks = task.subtasks.map((subtask) => {
              if (subtask.id === action.id) {
                return {
                  ...subtask,
                  title: action.title,
                  isCompleted: action.isCompleted,
                };
              }

              return subtask;
            });

            return {
              ...task,
              subtasks: newSubtasks,
            };
          });

          return {
            ...column,
            tasks: newTasks,
          };
        });

        return {
          ...board,
          columns: newColumns,
        };
      });

      return newBoards;
    }

    default: {
      // Make sure we always handle all action types
      neverReached(action);
    }
  }
  return boards;
}
