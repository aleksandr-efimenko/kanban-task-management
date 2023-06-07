import Link from "next/link";
import { useContext } from "react";
import { DropdownMenuContext } from "@/context/DrowdownMenuContext";

export type DropdownMenuItemProps = {
  title: string;
  destructive?: boolean;
  onClick: () => void;
};

export function DropdownMenuItem({
  title,
  destructive,
  onClick,
}: DropdownMenuItemProps) {
  const { handleMenu } = useContext(DropdownMenuContext);

  const handleClick = () => {
    onClick();
    handleMenu();
  };
  const bgColor = destructive
    ? "text-red"
    : "text-medium-gray hover:text-white";

  return (
    <Link href="#" onClick={handleClick}>
      <p
        className={`rounded-lg px-4 py-2 text-body-l hover:bg-purple  ${bgColor}`}
      >
        {title}
      </p>
    </Link>
  );
}
