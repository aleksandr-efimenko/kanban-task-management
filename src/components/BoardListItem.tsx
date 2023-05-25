import boardIcon from "~/assets/icon-board.svg";
import Image, { type StaticImageData } from "next/image";

export default function BoardListItem({
  title,
  selected,
}: {
  title: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[3rem] w-full items-center gap-4 pl-8 ${
        selected ? "bg-purple" : ""
      }`}
    >
      <Image
        src={boardIcon as StaticImageData}
        alt="Board icon"
        width={16}
        height={16}
        className={`${selected ? "brightness-200" : ""}`}
      />
      <p className={`${selected ? "text-white" : "text-medium-gray"}`}>
        {title}
      </p>
    </div>
  );
}
