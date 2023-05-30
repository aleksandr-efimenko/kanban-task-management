import { Logo } from "@/components/Logo";
import { ThemeToggleSwitch } from "@/components/ThemeToggleSwitch";
import { BoardsList } from "@/components/LeftPanel/BoardsList";
import { HidePanelButton } from "@/components/LeftPanel/HidePanelButton";

export function LeftsidePanel() {
  return (
    <div
      className="col-start-1 col-end-2 row-start-1 row-end-3 
    grid grid-rows-left-panel-desktop border-r 
    border-lines-light bg-white
    dark:border-lines-dark dark:bg-dark-gray
    "
    >
      <Logo />
      <BoardsList />
      <div className="flex flex-col gap-2 pb-8 pr-8">
        <ThemeToggleSwitch />
        <HidePanelButton />
      </div>
    </div>
  );
}
