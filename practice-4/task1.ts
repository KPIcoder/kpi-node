async function runSequent<T, U>(
  array: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    const finishedTask = await callback(array[i], i);
    result.push(finishedTask);
  }
  return result;
}
