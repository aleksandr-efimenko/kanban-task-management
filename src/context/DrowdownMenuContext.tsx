import { useState, createContext } from "react";

export type DropdownMenuContextType = {
  menu: boolean;
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
  const [menu, setMenu] = useState(false);
  const handleMenu = () => setMenu(!menu);

  return (
    <DropdownMenuContext.Provider value={{ menu, handleMenu }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}
