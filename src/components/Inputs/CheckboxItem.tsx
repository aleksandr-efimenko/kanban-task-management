export function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className="min-h-10 flex cursor-pointer items-center gap-4 
     rounded rounded-s bg-light-gray p-3 
     hover:bg-purple hover:bg-opacity-25 dark:bg-very-dark-gray"
    >
      <input
        type="checkbox"
        className="h-4 w-4 rounded-sm"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-body-m text-opacity-50  line-through">{label}</span>
    </label>
  );
}
