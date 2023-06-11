import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { TaskStatuskDropdownMenu } from "../DropDownMenu/DropdownMenu";
import chevronIcon from "~/assets/icon-chevron-down.svg";

export type SelectInputProps = React.ComponentPropsWithoutRef<"select"> & {
  label: string;
  options: string[];
  currentOption: string;
  handleSelectOption: (value: string) => void;
};

export function SelectInput(props: SelectInputProps) {
  const { label, options, currentOption, handleSelectOption } = props;
  const [showOptions, setShowOptions] = useState(false);

  const id = "status-select";
  const handleSelect = (value: string) => {
    handleSelectOption(value);
    setShowOptions(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <label
        className="relative text-body-m text-medium-gray dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="custom-select relative">
        <select
          onClick={() => {
            handleSelectOption(currentOption);
            setShowOptions(!showOptions);
          }}
          className="
            w-full appearance-none
            rounded rounded-s border border-dark-gray-input-border
            px-4 pb-[0.5625rem] pt-2
            focus:border-purple
            focus:outline-none dark:bg-dark-gray
            dark:text-white
            dark:placeholder-white
            dark:placeholder-opacity-25
            "
          {...props}
        >
          <option className="hidden" value={currentOption}>
            {currentOption}
          </option>
        </select>
        {showOptions && (
          <TaskStatuskDropdownMenu
            handleClick={handleSelect}
            options={options}
          />
        )}

        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          {showOptions ? (
            <Image
              src={chevronIcon as StaticImageData}
              alt="Chevron icon"
              width={16}
              height={16}
              className="rotate-180 transform"
            />
          ) : (
            <Image
              src={chevronIcon as StaticImageData}
              alt="Chevron icon"
              width={16}
              height={16}
            />
          )}
        </span>
      </div>
    </div>
  );
}
