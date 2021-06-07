export function flat(array: Array<number | number[]>): number[] {
  const result: number[] = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) result.push(...(array[i] as number[]));
    else result.push(array[i] as number);
  }
  return result;
}
