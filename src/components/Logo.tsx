import { useTheme } from "next-themes";
import darkLogo from "~/assets/logo-dark.svg";
import lightLogo from "~/assets/logo-light.svg";
import Image, { type StaticImageData } from "next/image";

export function Logo() {
  const { resolvedTheme } = useTheme();
  let src: string | StaticImageData;
  if (resolvedTheme === "dark") {
    src = darkLogo as StaticImageData;
  } else if (resolvedTheme === "light") {
    src = lightLogo as StaticImageData;
  } else {
    src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }

  return <Image src={src} alt="Logo" width={40} height={40} />;
}
