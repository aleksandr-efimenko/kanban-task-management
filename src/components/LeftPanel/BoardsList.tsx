import { BoardListItem } from "@/components/LeftPanel/LeftPanelItem";
import { CreateNewBoardButton } from "@/components/LeftPanel/CreateNewBoardButton";
import { useRouter } from "next/router";
import { useBoards } from "@/context/BoardsContext";

export function BoardsList() {
  const { boards, loading } = useBoards();
  console.log(boards);
  const router = useRouter();
  if (loading) return <div>loading...</div>;
  return (
    <div className="flex flex-col pr-6">
      <h2 className="pb-[1.1875rem] pl-8 text-heading-s uppercase text-medium-gray">
        ALL BOARDS ({boards?.length ?? 0})
      </h2>
      {boards?.map((board) => (
        <BoardListItem
          key={board.id}
          title={board.name}
          href={`/boards/${board.id}`}
          selected={board.id === router.query.id}
        />
      ))}
      <CreateNewBoardButton />
    </div>
  );
}
