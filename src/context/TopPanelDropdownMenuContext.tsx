import { useState, createContext } from "react";

export type DropdownMenuContextType = {
  menuIsOpen: boolean;
  handleMenu: (value?: boolean) => void;
};

export const TopPanelDropdownMenuContext =
  createContext<DropdownMenuContextType>({} as DropdownMenuContextType);

export function TopPanelDropdownMenuProvider({
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
    <TopPanelDropdownMenuContext.Provider value={{ menuIsOpen, handleMenu }}>
      {children}
    </TopPanelDropdownMenuContext.Provider>
  );
}
