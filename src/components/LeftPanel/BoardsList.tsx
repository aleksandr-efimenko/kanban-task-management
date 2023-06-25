import {
  BoardListItem,
  SkeletonBoardListItem,
} from "@/components/LeftPanel/LeftPanelItem";
import { useRouter } from "next/router";
import { useBoards } from "@/context/BoardsContext";

export function BoardsList() {
  const { boards, loading } = useBoards();
  const router = useRouter();

  const skeletonBoardList = Array.from({
    length: 5,
  }).map((_, i) => <SkeletonBoardListItem key={i} />);

  const boardList = boards?.map((board) => (
    <BoardListItem
      key={board.id}
      title={board.name}
      href={`/boards/${board.id}`}
      selected={board.id === router.query.id}
    />
  ));
  const boardListNumber = boards?.length ?? "";

  return (
    <div className="flex flex-col overflow-auto pr-6">
      <h2 className="pb-[1.1875rem] pl-8 text-heading-s uppercase text-medium-gray ">
        ALL BOARDS ({loading ? "..." : boardListNumber})
      </h2>
      {loading ? skeletonBoardList : boardList}
    </div>
  );
}
