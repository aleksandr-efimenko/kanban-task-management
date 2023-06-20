import { useBoards } from "@/context/BoardsContext";
import { ThreeDotsButton } from "@/components/Buttons/ThreeDotsMenu";
import { useRouter } from "next/router";
import { CreateNewTaskButton } from "./Buttons/CreateNewTaskButton";
import { BoardDropdownMenu } from "./DropDownMenu/DropdownMenu";
import { TopPanelDropdownMenuContext } from "@/context/TopPanelDropdownMenuContext";
import { useContext } from "react";
import { SignInButton } from "./Buttons/SignInButton";

export function TopPanel() {
  const router = useRouter();
  const boards = useBoards();
  const currentBoard = boards?.find((board) => board.id === router.query.id);
  const boardName = currentBoard ? currentBoard.name : "Board not found";
  const boardId = currentBoard ? currentBoard.id : "";
  const { menuIsOpen, handleMenu } = useContext(TopPanelDropdownMenuContext);

  return (
    <div
      className="col-start-2 col-end-2 row-start-1 row-end-2 
    w-full border-b border-lines-light 
    dark:border-lines-dark dark:bg-dark-gray"
    >
      <div className="flex items-center justify-between pl-6 pt-5">
        <h1 className="text-heading-xl">{boardName}</h1>
        <div className="flex items-center gap-6 px-8">
          <SignInButton />
          <CreateNewTaskButton boardId={boardId} />
          <ThreeDotsButton
            menuElement={<BoardDropdownMenu boardId={boardId} />}
            menuIsOpen={menuIsOpen}
            handleMenu={handleMenu}
          />
        </div>
      </div>
    </div>
  );
}
