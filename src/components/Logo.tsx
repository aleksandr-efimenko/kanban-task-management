import { useTheme } from "next-themes";
import darkLogo from "~/assets/logo-dark.svg";
import lightLogo from "~/assets/logo-light.svg";
import Image, { type StaticImageData } from "next/image";

export function Logo() {
  const { resolvedTheme } = useTheme();
  let src: string | StaticImageData;
  if (resolvedTheme === "dark") {
    src = lightLogo as StaticImageData;
  } else if (resolvedTheme === "light") {
    src = darkLogo as StaticImageData;
  } else {
    src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }

  return (
    <div className="py-8 md:px-[1.625rem] lg:px-[2.125rem]">
      <Image src={src} alt="Logo" width={152} height={25} />
    </div>
  );
}
