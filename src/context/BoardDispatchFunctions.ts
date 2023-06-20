import { generateColor } from "@/utils/generateColor";
import { Task, type Board } from "../utils/DataTypes";
import { AddBoardAction, type EditBoardAction } from "./BoardActions";

export function addBoardDispatch(boards: Board[], action: AddBoardAction) {
  const newBoard: Board = {
    id: action.boardId,
    name: action.boardName || "New Board",
    columns: action.columns.map((column) => ({
      id: action.boardId,
      name: column,
      color: generateColor(),
      tasks: [] as Task[],
    })),
  };
  return [...boards, newBoard];
}

export function editBoardDispatch(boards: Board[], action: EditBoardAction) {
  const newBoards = boards.map((board) => {
    if (board.id === action.boardId) {
      return {
        ...board,
        name: action.boardName,
        columns: action.columns,
      };
    }
    return board;
  });
  return newBoards;
}
