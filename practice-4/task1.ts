async function runSequent<T, U>(
  array: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  const result: U[] = [];
  for await (const [index, element] of array.entries()) {
    const finishedTask = await callback(element, index);
    result.push(finishedTask);
  }
  return result;
}
