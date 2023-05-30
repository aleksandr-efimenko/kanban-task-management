import { type StaticImageData } from "next/image";
import Link from "next/link";
import boardIcon from "~/assets/icon-board.svg";
import Image from "next/image";
import { useBoardsDispatch } from "@/context/BoardsContext";
import { ActionKind } from "@/context/BoardsContext";

export function CreateNewBoardButton({
  handleClick,
}: {
  handleClick?: () => void;
}) {
  const dispatch = useBoardsDispatch();
  console.log(new Date());
  return (
    <Link
      href="#"
      className={`group flex min-h-[3rem] w-full items-center gap-4 
        overflow-hidden text-ellipsis rounded-r-full pl-8 text-purple duration-200
        hover:scale-105`}
      onClick={() =>
        dispatch({
          type: ActionKind.ADD_BOARD,
          boardName: "New Board",
        })
      }
    >
      <Image
        src={boardIcon as StaticImageData}
        alt="Board icon"
        width={16}
        height={16}
        className="filter-purple"
      />
      <p className="flex-1">+ Create new board</p>
    </Link>
  );
}
