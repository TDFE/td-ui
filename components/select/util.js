export function toArray(value) {
  let newValue = value;
  if (value === undefined) {
    newValue = [];
  } else if (!Array.isArray(value)) {
    newValue = [value];
  }
  return newValue;
}
