import { type StaticImageData } from "next/image";
import Link from "next/link";
import boardIcon from "~/assets/icon-board.svg";
import Image from "next/image";
import { AddBoardForm } from "../ModalWindow/AddBoardForm";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

export function CreateNewBoardButton() {
  const { handleModal } = useContext(ModalContext);

  return (
    <Link
      href="#"
      className={`group flex min-h-[3rem] w-full items-center gap-4 justify-self-start overflow-hidden
       text-ellipsis rounded-r-full pl-8 text-purple duration-200

       `}
      onClick={() => {
        handleModal((<AddBoardForm />) as React.ReactNode);
      }}
    >
      <Image
        src={boardIcon as StaticImageData}
        alt="Board icon"
        width={16}
        height={16}
        className="filter-purple"
      />
      <p className="flex-1">+ Create new board</p>
    </Link>
  );
}
