import hideIcon from "~/assets/icon-hide-sidebar.svg";
import Image, { type StaticImageData } from "next/image";
import { LeftPanelItem } from "./LeftPanelItem";

export function HidePanelButton() {
  const handleClick = () => {
    console.log("Hide sidebar");
  };
  return (
    <LeftPanelItem title="Hide Sidebar" href="#" handleClick={handleClick}>
      <Image
        src={hideIcon as StaticImageData}
        alt="Hide sidebar icon"
        width={18}
        height={16}
        className="group-hover:filter-purple"
      />
    </LeftPanelItem>
  );
}
