export function generateColor() {
  const hex = Math.floor(Math.random() * 0xffffff);
  return "#" + hex.toString(16).padStart(6, "0");
}
