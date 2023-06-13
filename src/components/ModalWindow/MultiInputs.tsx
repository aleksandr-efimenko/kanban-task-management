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
  setInputs: (inputs: InputObject[]) => void;
};

export function MultiInputs({
  label,
  buttonText,
  inputs,
  setInputs,
}: MultiInputsProps) {
  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { value: "", id: "" }]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newInputs: InputObject[] = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value: e.target.value };
      }
      return input;
    });
    setInputs(newInputs);
  };

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
              handleInputChange(e, input.id)
            }
          />
          <RemoveInputButton onClick={() => handleRemoveInput(index)} />
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
