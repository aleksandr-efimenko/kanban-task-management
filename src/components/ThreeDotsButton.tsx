import Image, { type StaticImageData } from "next/image";
import threeDotsIcon from "~/assets/icon-vertical-ellipsis.svg";

export function ThreeDotsButton() {
  return (
    <button className="h-5 w-5 rounded-full hover:brightness-50 dark:hover:brightness-200">
      <Image
        src={threeDotsIcon as StaticImageData}
        alt="Three dots icon"
        width={4}
        height={20}
      />
    </button>
  );
}
