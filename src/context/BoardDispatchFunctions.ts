import { generateColor } from "@/utils/generateColor";
import { type Board } from "../utils/DataTypes";
import { type AddBoardAction, type EditBoardAction } from "./BoardActions";

export function addBoardDispatch(boards: Board[], action: AddBoardAction) {
  const newBoard: Board = {
    id: action.boardId,
    name: action.boardName || "New Board",
    columns: action.columns.map((column) => ({
      id: column.id,
      name: column.name,
      color: column.color || generateColor(),
      tasks: column.tasks,
    })),
  };
  return [...boards, newBoard];
}

export function editBoardDispatch(boards: Board[], action: EditBoardAction) {
  const newBoards = boards.map((board) => {
    if (board.id === action.boardId) {
      return {
        ...board,
        name: action.newBoardName,
        columns: action.columns,
      };
    }
    return board;
  });
  return newBoards;
}
