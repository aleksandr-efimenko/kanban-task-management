import Link from "next/link";

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
  const color = destructive ? "text-red" : "text-medium-gray";
  return (
    <Link href="#" onClick={onClick}>
      <p className={`text-body-l  ${color}`}>{title}</p>
    </Link>
  );
}
