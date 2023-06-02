import { useModal } from "@/hooks/useModal";
import { ModalWindow } from "@/components/ModalWindow/ModalWindow";
import { createContext } from "react";

export const ModalContext = createContext<ReturnType<typeof useModal>>(null);
const { Provider } = ModalContext;

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { modal, modalContent, handleModal } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <ModalWindow />
      {children}
    </Provider>
  );
}
