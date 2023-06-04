export type TextFieldWithoutLabelProps =
  React.ComponentPropsWithoutRef<"input"> & {
    errorMessage?: string;
  };

export function TextInput(props: TextFieldWithoutLabelProps) {
  const { errorMessage } = props;
  const borderColor = errorMessage
    ? "border-red"
    : "border-dark-gray-input-border focus:border-purple";
  return (
    <div className="relative w-full">
      <input
        {...props}
        className={`w-full rounded-s
      border px-4 pb-[0.5625rem] pt-2 
       focus:outline-none dark:bg-dark-gray
      dark:text-white
      dark:placeholder-white dark:placeholder-opacity-25
      ${borderColor}
      `}
      />
      {errorMessage && (
        <span className="absolute bottom-[0.625rem] right-4 text-body-l text-red">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
