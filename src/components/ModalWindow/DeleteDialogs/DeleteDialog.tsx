import { useContext } from "react";
import { ButtonDestructive, ButtonSecondary } from "../../Buttons/MainButtons";
import { ModalWindowTitle } from "@/components/ModalWindow/ModalWindowTitle";
import { ModalContext } from "@/context/ModalContext";

export type DestructiveDialogProps = {
  title: string;
  description: string;
  handleDelete: () => void;
  handleCancel: () => void;
};

export function DestructiveDialog({
  title,
  description,
  handleDelete,
  handleCancel,
}: DestructiveDialogProps) {
  const { handleModal } = useContext(ModalContext);
  return (
    <>
      <ModalWindowTitle title={title} destructive={true} />
      <p>{description}</p>
      <div className="flex gap-4">
        <ButtonDestructive
          onClick={() => {
            handleDelete();
            handleModal();
          }}
        >
          Delete
        </ButtonDestructive>
        <ButtonSecondary onClick={handleCancel}>Cancel</ButtonSecondary>
      </div>
    </>
  );
}
