import { TextInput } from "../Inputs/TextInput";
import { ButtonSecondary } from "../Buttons/MainButtons";
import closeIcon from "~/assets/icon-cross.svg";
import Image, { type StaticImageData } from "next/image";

export function MultiInputs({
  label,
  buttonText,
  inputs,
  setInputs,
}: {
  label: string;
  buttonText: string;
  inputs: string[];
  setInputs: (inputs: string[]) => void;
  initialInputs?: string[];
}) {
  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
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
            value={input}
            inputType="textInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newInputs = [...inputs];
              newInputs[index] = e.target.value;
              setInputs(newInputs);
            }}
          />
          <RemoveInputButton onClick={() => handleRemoveInput(index)} />
        </div>
      ))}
      <ButtonSecondary onClick={() => setInputs([...inputs, ""])}>
        {buttonText}
      </ButtonSecondary>
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
