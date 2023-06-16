import { useState, createContext } from "react";
import type { DropdownMenuContextType } from "@/context/TopPanelDropdownMenuContext";

export const TaskViewDropdownMenuContext =
  createContext<DropdownMenuContextType>({} as DropdownMenuContextType);

export function TaskViewDropdownMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuIsOpen, setMenu] = useState(false);
  const handleMenu = (value?: boolean) => {
    if (value !== undefined) {
      setMenu(value);
      return;
    }
    setMenu((prev) => !prev);
  };

  return (
    <TaskViewDropdownMenuContext.Provider value={{ menuIsOpen, handleMenu }}>
      {children}
    </TaskViewDropdownMenuContext.Provider>
  );
}
