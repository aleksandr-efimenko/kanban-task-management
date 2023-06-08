import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { TaskStatuskDropdownMenu } from "../DropDownMenu/DropdownMenu";
import chevronIcon from "~/assets/icon-chevron-down.svg";
import { set } from "zod";

export type SelectInputProps = React.ComponentPropsWithoutRef<"select"> & {
  label: string;
  id: string;
  options: string[];
  currentOption: string;
};

export function SelectInput(props: SelectInputProps) {
  const { id, label, options, currentOption } = props;
  const [selectedOption, setSelectedOption] = useState(
    currentOption ? currentOption : options[0]
  );
  const [showOptions, setShowOptions] = useState(false);
  const handleSelect = (value: string) => {
    setSelectedOption(value);
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
          <option className="hidden" value={selectedOption}>
            {selectedOption}
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