import boardIcon from "~/assets/icon-board.svg";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type LeftPanelItemProps = {
  title: string;
  href: string;
  children: React.ReactNode;
  selected?: boolean;
  handleClick?: () => void;
};

export function LeftPanelItem({
  title,
  href,
  children,
  selected,
  handleClick,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  selected?: boolean;
  handleClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`group flex min-h-[3rem] w-full items-center gap-4 
      overflow-hidden text-ellipsis rounded-r-full pl-8 duration-200
      hover:bg-purple hover:bg-opacity-10 hover:text-purple hover:dark:bg-white ${
        selected ? "bg-purple text-white" : "text-medium-gray"
      }`}
      onClick={handleClick}
    >
      {children}
      <p className="flex-1">{title}</p>
    </Link>
  );
}

export function BoardListItem({
  title,
  href,
  selected,
}: {
  title: string;
  href: string;
  selected?: boolean;
}) {
  return (
    <LeftPanelItem title={title} href={href} selected={selected}>
      <Image
        src={boardIcon as StaticImageData}
        alt="Board icon"
        width={16}
        height={16}
        className={[
          "group-hover:filter-purple",
          selected ? "brightness-200" : "",
        ].join(" ")}
      />
    </LeftPanelItem>
  );
}
