import { createContext, useContext, useReducer, type Dispatch } from "react";
import defaultBoardsData from "@/data/defaultBoard.json";
import { type Board } from "@/utils/DataTypes";
import { uuid } from "uuidv4";

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

const BoardsContext = createContext<typeof boardsWithIds | null>(null);
export const BoardsDispatchContext =
  createContext<Dispatch<BoardAction> | null>(null);

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  ADD_BOARD,
  CHANGE_BOARD,
  DELETE_BOARD,
  ADD_COLUMN,
  CHANGE_COLUMN,
  DELETE_COLUMN,
  ADD_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  ADD_SUBTASK,
  CHANGE_SUBTASK,
  DELETE_SUBTASK,
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
  const [boards, dispatch] = useReducer(boardsReducer, boardsWithIds);

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

function boardsReducer(boards: typeof boardsWithIds, action: BoardAction) {
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
      const newBoards = boards.map((board) => {
        if (board.id === action.boardId) {
          return {
            ...board,
            name: action.boardName || board.name,
          };
        }
        return board;
      });
      return newBoards;
    }
    case ActionKind.DELETE_BOARD: {
      const newBoards = boards.filter((board) => board.id !== action.boardId);
      return newBoards;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
