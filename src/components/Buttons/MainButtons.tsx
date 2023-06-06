export function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={`w-full rounded-3xl px-4 py-2 duration-200 ${
        props.className || ""
      }`}
    >
      {props.children}
    </button>
  );
}

export function ButtonPrimaryL(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      {...props}
      className="h-12 bg-purple text-button-primary text-white hover:bg-purple-hover"
    >
      {props.children}
    </Button>
  );
}

export function ButtonPrimaryS(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      {...props}
      className="h-10 bg-purple text-button-secondary text-white hover:bg-purple-hover"
    >
      {props.children}
    </Button>
  );
}

export function ButtonSecondary(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      {...props}
      className="h-10 bg-button-secondary text-button-secondary text-purple hover:bg-button-secondary-hover
    dark:bg-white dark:hover:bg-white"
    >
      {props.children}
    </Button>
  );
}

export function ButtonDestructive(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      {...props}
      className="h-10 bg-red text-button-secondary text-white hover:bg-red-hover"
    >
      {props.children}
    </Button>
  );
}
