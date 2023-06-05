import { type ReactNode, useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const handleModal = (content: ReactNode = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return {
    modal,
    modalContent,
    handleModal,
  };
};
