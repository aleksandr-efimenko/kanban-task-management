import { Session } from "next-auth";
import { uuid } from "uuidv4";
import { api } from "./api";
import { generateColor } from "./generateColor";

export const initialBoardForm = {
  title: "",
  titleError: "",
  columns: [
    { title: "Todo", id: uuid() },
    { title: "Doing", id: uuid() },
  ],
} as BoardForm;

export type BoardForm = {
  title: string;
  titleError?: string;
  columns: { id: string; title: string; color?: string }[];
};

const createLocalBoard = (boardForm: typeof initialBoardForm) => {
  return {
    id: uuid(),
    name: boardForm.title,
    columns: boardForm.columns.map((column) => {
      return {
        id: column.id,
        name: column.title,
        tasks: [],
        color: generateColor(),
      };
    }),
  };
};

export const addBoard = async (
  boardForm: BoardForm,
  session: Session | null,
  createBoardMutation: ReturnType<typeof api.boards.createBoard.useMutation>
) => {
  if (session?.user) {
    const board = await createBoardMutation.mutateAsync({
      name: boardForm.title,
      ownerId: session?.user?.id || "",
      columns: boardForm.columns.map((column) => column.title),
    });
    return board;
  } else {
    const board = createLocalBoard(boardForm);
    return board;
  }
};
