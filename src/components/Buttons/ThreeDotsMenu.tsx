import Image, { type StaticImageData } from "next/image";
import threeDotsIcon from "~/assets/icon-vertical-ellipsis.svg";

export type ThreeDotsButtonProps = {
  menuElement: JSX.Element;
  menuIsOpen: boolean;
  handleMenu: () => void;
};

export function ThreeDotsButton({
  menuElement,
  menuIsOpen,
  handleMenu,
}: ThreeDotsButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={handleMenu}
        className="flex h-5 w-5 items-center justify-center rounded-full hover:brightness-50 dark:hover:brightness-200"
      >
        <Image
          src={threeDotsIcon as StaticImageData}
          alt="Three dots icon"
          width={4}
          height={20}
        />
      </button>
      {menuIsOpen && menuElement}
    </div>
  );
}
