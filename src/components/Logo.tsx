import { useTheme } from "next-themes";
import darkLogo from "~/assets/logo-dark.svg";
import lightLogo from "~/assets/logo-light.svg";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Logo() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  let src: string | StaticImageData;
  if (resolvedTheme === "dark") {
    src = lightLogo as StaticImageData;
  } else {
    src = darkLogo as StaticImageData;
  }

  return (
    <Link href="/" className="max-h-7 py-8 md:px-[1.625rem] lg:px-[2.125rem]">
      <Image src={src} alt="Logo" width={152} height={25} />
    </Link>
  );
}
