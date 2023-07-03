import { generateColor } from "@/utils/generateColor";
import { type AddBoardAction, type EditBoardAction } from "./BoardActions";
import { type Board } from "@prisma/client";
import type { BoardWithColumnsAndTasks } from "./BoardsContext";

export function addBoardDispatch(
  boards: BoardWithColumnsAndTasks[],
  action: AddBoardAction
) {
  const newBoard: BoardWithColumnsAndTasks = {
    id: action.boardId,
    name: action.boardName || "New Board",
    createdAt: new Date(),
    ownerId: "localhost",
    // columns: action.columns.map((column) => ({
    //   id: column.id,
    //   name: column.name,
    //   color: column.color || generateColor(),
    //   tasks: column.tasks,
    // })),
    columns: [],
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
