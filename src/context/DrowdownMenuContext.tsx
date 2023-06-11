import { useState, createContext } from "react";

export type DropdownMenuContextType = {
  menuIsOpen: boolean;
  handleMenu: () => void;
};

export const DropdownMenuContext = createContext<DropdownMenuContextType>(
  {} as DropdownMenuContextType
);

export function DropdownMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuIsOpen, setMenu] = useState(false);
  const handleMenu = () => setMenu(!menuIsOpen);

  return (
    <DropdownMenuContext.Provider
      value={{ menuIsOpen: menuIsOpen, handleMenu }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}
