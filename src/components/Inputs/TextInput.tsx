export function TextInput({
  placeholder,
  id,
  type,
  value,
  setValue,
  errorMessage,
}: {
  placeholder?: string;
  id: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
}) {
  const borderColor = errorMessage
    ? "border-red"
    : "border-dark-gray-input-border focus:border-purple";
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder || ""}
        className={`w-full rounded-s 
      border px-4 pb-[0.5625rem] pt-2 
       focus:outline-none dark:bg-dark-gray
      dark:text-white
      dark:placeholder-white dark:placeholder-opacity-25
      ${borderColor}
      `}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorMessage && (
        <span className="absolute bottom-[0.625rem] right-4 text-body-l text-red">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
