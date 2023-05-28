import boardIcon from "~/assets/icon-board.svg";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export function BoardListItem({
  title,
  id,
  selected,
}: {
  title: string;
  id: string;
  selected?: boolean;
}) {
  return (
    <Link
      href={`/boards/${id}`}
      className={`group flex min-h-[3rem] w-full items-center gap-4 
      text-ellipsis rounded-r-full pl-8 duration-200 
      hover:bg-purple hover:bg-opacity-10 hover:text-purple hover:dark:bg-white ${
        selected ? "bg-purple text-white" : "text-medium-gray"
      }`}
    >
      <Image
        src={boardIcon as StaticImageData}
        alt="Board icon"
        width={16}
        height={16}
        className={[
          "overflow-hidden",
          "text-ellipsis",
          "group-hover:filter-purple",
          selected ? "brightness-200" : "",
        ].join(" ")}
      />
      <p className="flex-1">{title}</p>
    </Link>
  );
}
