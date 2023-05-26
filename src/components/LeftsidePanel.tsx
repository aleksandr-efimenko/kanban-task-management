import { Logo } from "@/components/Logo";
import { ThemeToggleSwitch } from "./ThemeToggleSwitch";
import BoardList from "./BoardList";
import HidePanelButton from "./HidePanelButton";

export default function LeftsidePanel() {
  return (
    <div
      className="col-start-1 col-end-2 row-start-1 row-end-3 
    grid grid-rows-left-panel-desktop border-r 
    border-lines-light bg-white
    dark:border-lines-dark dark:bg-dark-gray
    "
    >
      <Logo />
      <BoardList />
      <div className="pb-8">
        <ThemeToggleSwitch />
        <HidePanelButton />
      </div>
    </div>
  );
}
