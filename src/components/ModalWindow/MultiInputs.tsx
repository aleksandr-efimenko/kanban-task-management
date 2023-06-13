import { TextInput } from "../Inputs/TextInput";
import { ButtonSecondary } from "../Buttons/MainButtons";
import closeIcon from "~/assets/icon-cross.svg";
import Image, { type StaticImageData } from "next/image";

export type InputObject = {
  value: string;
  id: string;
};

export type MultiInputsProps = {
  label: string;
  buttonText: string;
  inputs: InputObject[];
  handleInputChange: (newValue: string, id: string) => void;
  handleRemoveInput: (id: string) => void;
  handleAddInput: () => void;
};

export function MultiInputs({
  label,
  buttonText,
  inputs,
  handleInputChange,
  handleRemoveInput,
  handleAddInput,
}: MultiInputsProps) {
  return (
    <div className="flex max-h-60 flex-col gap-3  overflow-auto">
      <label className="relative text-body-m text-medium-gray dark:text-white">
        {label}
      </label>
      {inputs.map((input, index) => (
        <div className="flex w-full gap-4" key={index}>
          <TextInput
            value={input.value}
            inputType="textInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value, input.id)
            }
          />
          <RemoveInputButton onClick={() => handleRemoveInput(input.id)} />
        </div>
      ))}
      <ButtonSecondary onClick={handleAddInput}>{buttonText}</ButtonSecondary>
    </div>
  );
}

export function RemoveInputButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="Remove input">
      <Image
        src={closeIcon as StaticImageData}
        alt="Close icon"
        width={16}
        height={16}
      />
    </button>
  );
}
