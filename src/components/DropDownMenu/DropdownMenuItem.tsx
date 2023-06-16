import Link from "next/link";

export type DropdownMenuItemProps = {
  title: string;
  destructive?: boolean;
  onClick: () => void;
  handleMenu?: () => void;
};

export function DropdownMenuItem({
  title,
  destructive,
  onClick,
}: DropdownMenuItemProps) {
  const bgColor = destructive
    ? "text-red"
    : "text-medium-gray hover:text-white";

  return (
    <Link href="#" onClick={onClick}>
      <p
        className={`rounded-lg px-4 py-2 text-body-l hover:bg-purple  ${bgColor}`}
      >
        {title}
      </p>
    </Link>
  );
}
