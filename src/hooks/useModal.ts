import { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleModal = (content: React.ReactNode) => {
    setModal(!modal);
    if (content) setModalContent(content);
  };

  return {
    modal,
    modalContent,
    handleModal,
  };
};
