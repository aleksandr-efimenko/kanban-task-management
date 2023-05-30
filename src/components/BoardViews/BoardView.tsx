export function BoardViewContainer({
  children,
  columns,
}: {
  children: React.ReactNode;
  columns: boolean;
}) {
  return (
    <div
      className={`col-start-2 col-end-3 row-start-2 row-end-3
        grid max-h-full ${columns ? "auto-cols-board-view" : ""} grid-flow-col 
        gap-6 overflow-auto bg-light-gray p-6 dark:bg-very-dark-gray
    `}
    >
      {children}
    </div>
  );
}
