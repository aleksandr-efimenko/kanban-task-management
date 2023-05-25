import { Logo } from "@/components/Logo";
import { ThemeToggleSwitch } from "./ThemeToggleSwitch";
import BoardList from "./BoardList";

export default function LeftsidePanel() {
  return (
    <div className="col-start-1 col-end-2 row-start-1 row-end-3 border-r border-lines-light bg-white dark:border-lines-dark dark:bg-dark-gray">
      <Logo />
      <BoardList />
      <ThemeToggleSwitch />
    </div>
  );
}
