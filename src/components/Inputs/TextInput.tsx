export type TextFieldWithoutLabelProps = (
  | React.ComponentPropsWithoutRef<"input">
  | React.ComponentPropsWithoutRef<"textarea">
) & {
  errorMessage?: string;
  inputType: "textInput" | "textareaInput";
};

/**
 * This component is a wrapper for input and textarea.
 * It adds a border and error message to the input.
 * @param props  - errorMessage, inputType, and all props from input or textarea
 * @returns   - an input or textarea
 * @example
 * <TextInput
 *  type="text"
 *  placeholder="e.g. Web Design"
 *  value={boardForm.title}
 *  onChange={handleInputChange}
 *  errorMessage={boardForm.titleError}
 * />
 * <TextInput
 *  type="textarea"
 *  placeholder="e.g. Web Design"
 *  value={boardForm.title}
 *  onChange={handleInputChange}
 *  errorMessage={boardForm.titleError}
 *  rows={3}
 * />
 */
export function TextInput(props: TextFieldWithoutLabelProps) {
  const { errorMessage, inputType } = props;
  const borderColor = errorMessage
    ? "border-red"
    : "border-dark-gray-input-border focus:border-purple";
  const inputClassName = `w-full rounded-s
    border px-4 pb-[0.5625rem] pt-2 
     focus:outline-none dark:bg-dark-gray
    dark:text-white
    dark:placeholder-white dark:placeholder-opacity-25
    ${borderColor}
    `;

  // render input based on inputType prop
  const getInput = () => {
    if (inputType === "textInput")
      return (
        <input
          {...(props as React.ComponentPropsWithoutRef<"input">)}
          type="text"
          className={inputClassName}
        />
      );
    else if (inputType === "textareaInput")
      return (
        <textarea
          {...(props as React.ComponentPropsWithoutRef<"textarea">)}
          className={inputClassName}
        />
      );
  };

  return (
    <div className="relative w-full">
      {getInput()}
      {errorMessage && (
        <span className="absolute bottom-[0.625rem] right-4 text-body-l text-red">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
