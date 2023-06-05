export function ModalWindowTitle({
  title,
  destructive,
}: {
  title: string;
  destructive?: boolean;
}) {
  return (
    <h2 className={`text-heading-l ${destructive ? "text-red" : ""}`}>
      {title}
    </h2>
  );
}
