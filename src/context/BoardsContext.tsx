import { createContext, useContext, useReducer } from "react";

import defaultBoardsData from "@/data/defaultBoard.json";
import { type Board } from "@/utils/DataTypes";

const initialBoards = defaultBoardsData.boards;

const BoardsContext = createContext(initialBoards);
const BoardsDispatchContext = createContext(null);

// An enum with all the types of actions to use in our reducer
enum ActionKind {
  ADD = "ADD",
  CHANGE = "CHANGE",
  DELETE = "DELETE",
}

// An interface for our actions
interface BoardAction {
  type: ActionKind;
  payload: {
    id: string;
    name?: string;
  };
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
  const { type, payload } = action;
  switch (type) {
    case "ADD": {
      return [
        ...boards,
        {
          id: payload.id,
          name: payload.name,
          columns: [],
        },
      ];
    }
    case "CHANGE": {
      return boards.map((t) => {
        if (t.id === payload.id) {
          if (!payload.name) {
            throw Error("Name is required to change a board");
          }
          return (t.name = payload.name);
        } else {
          return t;
        }
      });
    }
    case "DELETE": {
      return boards.filter((t) => t.id !== payload.id);
    }
    default: {
      throw Error("Unknown  " + type);
    }
  }
}
