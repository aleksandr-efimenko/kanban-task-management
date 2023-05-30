import { createContext, useContext, useReducer, type Dispatch } from "react";
import defaultBoardsData from "@/data/defaultBoard.json";
import { type Board } from "@/utils/DataTypes";
import { uuid } from "uuidv4";

const initialBoards = defaultBoardsData.boards;

const BoardsContext = createContext<Board[] | null>(null);
const BoardsDispatchContext = createContext<Dispatch<BoardAction> | null>(null);

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  ADD_BOARD = "ADD_BOARD",
  CHANGE_BOARD = "CHANGE_BOARD",
  DELETE_BOARD = "DELETE_BOARD",
  ADD_COLUMN = "ADD_COLUMN",
  CHANGE_COLUMN = "CHANGE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  ADD_TASK = "ADD_TASK",
  CHANGE_TASK = "CHANGE_TASK",
  DELETE_TASK = "DELETE_TASK",
  ADD_SUBTASK = "ADD_SUBTASK",
  CHANGE_SUBTASK = "CHANGE_SUBTASK",
  DELETE_SUBTASK = "DELETE_SUBTASK",
}

// An interface for our actions
interface BoardAction {
  type: ActionKind;
  boardId?: string;
  boardName?: string;
  columnId?: string;
  columnName?: string;
  taskId?: string;
  taskName?: string;
  subtaskId?: string;
  subtaskName?: string;
}

export function BoardsProvider({ children }: { children: React.ReactNode }) {
  const [boards, dispatch] = useReducer(boardsReducer, initialBoards);

  return (
    <BoardsContext.Provider value={boards as Board[]}>
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

function boardsReducer(boards: Board[], action: BoardAction) {
  switch (action.type) {
    case ActionKind.ADD_BOARD: {
      const newBoard: Board = {
        id: uuid(),
        name: action.boardName || "New Board",
        columns: [],
      };
      return [...boards, newBoard];
    }
    case ActionKind.CHANGE_BOARD: {
      const { boardId, boardName } = action;
      return boards.map((board) =>
        board.id === boardId ? { ...board, name: boardName } : board
      );
    }
    case ActionKind.DELETE_BOARD: {
      const { boardId } = action;
      return boards.filter((board) => board.id !== boardId);
    }
    case ActionKind.ADD_COLUMN: {
      const { boardId, columnName } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: [
                ...board.columns,
                { id: uuid(), name: columnName || "New Column", tasks: [] },
              ],
            }
          : board
      );
    }
    case ActionKind.CHANGE_COLUMN: {
      const { boardId, columnId, columnName } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? { ...column, name: columnName }
                  : column
              ),
            }
          : board
      );
    }
    case ActionKind.DELETE_COLUMN: {
      const { boardId, columnId } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.filter((column) => column.id !== columnId),
            }
          : board
      );
    }
    case ActionKind.ADD_TASK: {
      const { boardId, columnId, taskName } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: [
                        ...column.tasks,
                        {
                          id: uuid(),
                          name: taskName || "New Task",
                          subtasks: [],
                        },
                      ],
                    }
                  : column
              ),
            }
          : board
      );
    }
    case ActionKind.CHANGE_TASK: {
      const { boardId, columnId, taskId, taskName } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId ? { ...task, name: taskName } : task
                      ),
                    }
                  : column
              ),
            }
          : board
      );
    }
    case ActionKind.DELETE_TASK: {
      const { boardId, columnId, taskId } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column
              ),
            }
          : board
      );
    }
    case ActionKind.ADD_SUBTASK: {
      const { boardId, columnId, taskId, subtaskName } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              subtasks: [
                                ...task.subtasks,
                                {
                                  id: uuid(),
                                  name: subtaskName || "New Subtask",
                                },
                              ],
                            }
                          : task
                      ),
                    }
                  : column
              ),
            }
          : board
      );
    }
    case ActionKind.CHANGE_SUBTASK: {
      const { boardId, columnId, taskId, subtaskId, subtaskName } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              subtasks: task.subtasks.map((subtask) =>
                                subtask.id === subtaskId
                                  ? { ...subtask, name: subtaskName }
                                  : subtask
                              ),
                            }
                          : task
                      ),
                    }
                  : column
              ),
            }
          : board
      );
    }
    case ActionKind.DELETE_SUBTASK: {
      const { boardId, columnId, taskId, subtaskId } = action;
      return boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              subtasks: task.subtasks.filter(
                                (subtask) => subtask.id !== subtaskId
                              ),
                            }
                          : task
                      ),
                    }
                  : column
              ),
            }
          : board
      );
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type as string}`);
    }
  }
}
