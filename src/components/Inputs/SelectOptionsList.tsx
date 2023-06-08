export function SelectOptionsList({ options }: { options: string[] }) {
  return (
    <>
      {options.map((option, index) => (
        <option key={index} className="hover:bg-purple">
          {option}
        </option>
      ))}
    </>
  );
}
