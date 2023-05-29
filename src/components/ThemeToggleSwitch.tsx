import { useTheme } from "next-themes";
import lightThemeIcon from "~/assets/icon-light-theme.svg";
import darkThemeIcon from "~/assets/icon-dark-theme.svg";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
// Toggle switch styles from "https://flowbite.com/docs/forms/toggle/"

export function ThemeToggleSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="pl-6">
      <div className="flex min-h-[3rem] w-full items-center justify-center rounded-md bg-light-gray dark:bg-very-dark-gray">
        <label className="relative inline-flex cursor-pointer items-center gap-6">
          <Image
            src={lightThemeIcon as StaticImageData}
            alt="Light theme icon"
            width={18}
            height={18}
          />
          <div className="relative w-full">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              onChange={handleThemeChange}
              checked={theme === "dark"}
            />
            <div
              className="peer h-5 w-10 rounded-full bg-purple after:absolute
            after:left-[3px] after:top-[3px]
            after:h-[0.875rem] after:w-[0.875rem] after:rounded-full
            after:bg-white after:transition-all after:content-['']
            peer-checked:after:translate-x-5
            peer-focus:outline-none "
            ></div>
          </div>
          <Image
            src={darkThemeIcon as StaticImageData}
            alt="Light theme icon"
            width={18}
            height={18}
          />
        </label>
      </div>
    </div>
  );
}
