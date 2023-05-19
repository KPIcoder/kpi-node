function arrayChangeDelete<T>(
  array: T[],
  deleteRule: (item: T) => boolean
): T[] {
  const deletedElements: T[] = [];

  for (let i = 0; i < array.length; i++) {
    if (deleteRule(array[i])) {
      deletedElements.push(array[i]);
      array.splice(i, 1);
      i--;
    }
  }

  return deletedElements;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

console.log(array); // [1, 3, 7, 9]
console.log(deletedElements); // [2, 6]
