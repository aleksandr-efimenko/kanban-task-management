import Image, { type StaticImageData } from "next/image";
import threeDotsIcon from "~/assets/icon-vertical-ellipsis.svg";
import { BoardDropDownMenu } from "@/components/DropDownMenu/DropdownMenu";
import { useState } from "react";

export type DropDownItemType = {
  type: "board" | "task";
  id: string;
};

export function ThreeDotsButton({ type, id }: DropDownItemType) {
  const [menu, setMenu] = useState(false);
  const getMenu = () => {
    if (type === "board") {
      return <BoardDropDownMenu boardId={id} />;
    } else if (type === "task") {
      return;
    }
  };
  const handleMenu = () => {
    setMenu(!menu);
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
