import Image, { type StaticImageData } from "next/image";
import threeDotsIcon from "~/assets/icon-vertical-ellipsis.svg";
import { BoardDropdownMenu } from "@/components/DropDownMenu/DropdownMenu";
import { useContext } from "react";
import { DropdownMenuContext } from "@/context/DrowdownMenuContext";

export type DropDownItemType = {
  type: "board" | "task";
  id: string;
};

export function ThreeDotsButton({ type, id }: DropDownItemType) {
  const { menu, handleMenu } = useContext(DropdownMenuContext);
  const getMenu = () => {
    if (type === "board") {
      return <BoardDropdownMenu boardId={id} />;
    } else if (type === "task") {
      return;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleMenu}
        className="h-5 w-5 rounded-full hover:brightness-50 dark:hover:brightness-200"
      >
        <Image
          src={threeDotsIcon as StaticImageData}
          alt="Three dots icon"
          width={4}
          height={20}
        />
      </button>
      {menu && getMenu()}
    </div>
  );
}
