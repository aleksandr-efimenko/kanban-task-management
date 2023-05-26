import boardIcon from "~/assets/icon-board.svg";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export default function BoardListItem({
  title,
  selected,
}: {
  title: string;
  selected?: boolean;
}) {
  return (
    <Link
      href={`/board/${title}}`}
      className={`group flex min-h-[3rem] w-full items-center gap-4 rounded-r-full pl-8 duration-200 hover:bg-purple-hover hover:text-white ${
        selected ? "bg-purple text-white" : "text-medium-gray"
      }`}
    >
      <Image
        src={boardIcon as StaticImageData}
        alt="Board icon"
        width={16}
        height={16}
        className={`${
          selected ? "brightness-200" : "group-hover:brightness-200"
        }`}
      />
      <p>{title}</p>
    </Link>
  );
}
