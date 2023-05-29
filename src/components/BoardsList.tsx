import { BoardListItem, CreateBoardButton } from "@/components/LeftPanelItem";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useBoards } from "@/context/BoardsContext";

export function BoardsList() {
  const boards = useBoards();
  const router = useRouter();

  return (
    <div className="flex flex-col pr-6">
      <h2 className="pb-[1.1875rem] pl-8 text-heading-s uppercase text-medium-gray">
        ALL BOARDS ({boards.length})
      </h2>
      {boards.map((board) => (
        <BoardListItem
          key={board.name}
          title={board.name}
          href={`/boards/${board.id}`}
          selected={board.id === router.query.id}
        />
      ))}
      <CreateBoardButton />
    </div>
  );
}
