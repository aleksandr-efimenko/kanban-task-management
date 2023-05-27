import hideIcon from "~/assets/icon-hide-sidebar.svg";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export function HidePanelButton() {
  return (
    <Link
      href="javascript:void(0)"
      className="flex min-h-[3rem] items-center gap-[0.9375rem] pl-8"
    >
      <Image
        src={hideIcon as StaticImageData}
        alt="Hide sidebar icon"
        width={18}
        height={16}
      />
      <p className="text-medium-gray">Hide Sidebar</p>
    </Link>
  );
}
