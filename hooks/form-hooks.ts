export function deleteSubtaskField(i: number, array: number[]) {
  return array.filter((item) => item !== i);
}
