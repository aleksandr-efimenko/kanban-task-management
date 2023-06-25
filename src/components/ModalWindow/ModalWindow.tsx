import { ModalContext } from "@/context/ModalContext";
import { TaskViewDropdownMenuContext } from "@/context/TaskViewDropdownMenuContext";
import { useContext } from "react";
import { createPortal } from "react-dom";

export function ModalWindow() {
  const { modal, handleModal, modalContent } = useContext(ModalContext);
  const { handleMenu } = useContext(TaskViewDropdownMenuContext);
  if (!modal) return null;

  return createPortal(
    <div className="">
      <div
        className="absolute inset-0 z-30 bg-black bg-opacity-50 "
        onClick={() => {
          handleModal();
          handleMenu(false);
        }}
      ></div>

      <div
        className="absolute left-1/2 top-1/2
        z-50 max-h-full w-[30rem]
        -translate-x-1/2 -translate-y-1/2 transform
         rounded-md bg-white p-8 dark:bg-dark-gray"
      >
        <div className="flex flex-col gap-6">{modalContent}</div>
      </div>
    </div>,
    document.querySelector("#modal-root") as HTMLElement
  );
}
