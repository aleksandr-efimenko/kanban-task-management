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
      const newBoard: Board = {
        id: action.boardId,
        name: action.boardName || "New Board",
        columns: action.columns.map((column) => ({
          id: uuid(),
          name: column,
          color: generateColor(),
          tasks: [] as Task[],
        })),
      };
      return [...boards, newBoard];
    }
    case "CHANGE_BOARD": {
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
                id: uuid(),
                name: action.columnName,
                color: generateColor(),
                tasks: [] as Task[],
              },
            ],
          };
        }
        return board;
      });
      return newBoards;
    }
    case "CHANGE_COLUMN": {
      const newBoards = boards.map((board) => {
        if (board.id === action.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === action.columnId) {
                return {
                  ...column,
                  name: action.columnName,
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
    case "DELETE_COLUMN": {
      const newBoards = boards.map((board) => {
        if (board.id === action.boardId) {
          return {
            ...board,
            columns: board.columns.filter(
              (column) => column.id !== action.columnId
            ),
          };
        }
        return board;
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
