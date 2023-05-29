import { useBoards } from "@/context/BoardsContext";
import { ButtonPrimaryL } from "./Buttons";
import { ThreeDotsButton } from "./ThreeDotsButton";
import { useRouter } from "next/router";

export function TopPanel() {
  const router = useRouter();
  const boards = useBoards();
  const currentBoard = boards.find((board) => board.id === router.query.id);
  const boardName = currentBoard ? currentBoard.name : "Board not found";
  return (
    <div
      className="col-start-2 col-end-2 row-start-1 row-end-2 
    w-full border-b border-lines-light 
    dark:border-lines-dark dark:bg-dark-gray"
    >
      <div className="flex items-center justify-between pl-6 pt-5">
        <h1 className="text-heading-xl">{boardName}</h1>
        <div className="flex items-center gap-6">
          <ButtonPrimaryL>+ Add new Task</ButtonPrimaryL>
          <ThreeDotsButton />
        </div>
      </div>
    </div>
  );
}
