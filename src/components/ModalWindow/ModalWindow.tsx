export default function ModalWindow({
  modalWindowOpen,
  setModalWindowOpen,
  children,
}: {
  modalWindowOpen: boolean;
  setModalWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const handleCloseModal = () => {
    setModalWindowOpen(false);
  };
  return (
    { modalWindowOpen } && (
      <div
        className="absolute inset-0 z-50 bg-black bg-opacity-50"
        onClick={handleCloseModal}
      >
        <div
          className="absolute left-1/2
      top-1/2 w-[30rem] -translate-x-1/2 -translate-y-1/2 
      transform rounded-md bg-white p-8
      dark:bg-dark-gray"
        >
          {children}
        </div>
      </div>
    )
  );
}
