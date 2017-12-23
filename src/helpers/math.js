export function round(value) {
  let number = Number(Math.round(value +'e' + 2) + 'e-' + 2);
  return number.toFixed(2);
}
