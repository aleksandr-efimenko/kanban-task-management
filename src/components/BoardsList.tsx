import { BoardListItem } from "@/components/BoardListItem";
import { useContext } from "react";
import { BoardsContext } from "@/context/BoardsContext";
import { useRouter } from "next/router";

export function BoardsList() {
  const { boards } = useContext(BoardsContext);
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
          id={board.id}
          selected={board.id === router.query.id}
        />
      ))}
    </div>
  );
}
