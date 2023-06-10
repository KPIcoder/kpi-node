function arrayChangeDelete<T>(
  array: Array<T>,
  deleteRule: (item: T) => boolean
): Array<T> {
  const deletedElements = array.filter(deleteRule);

  array.splice(0, array.length, ...array.filter((item) => !deleteRule(item)));

  return deletedElements;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

console.log(array); // [1, 3, 7, 9]
console.log(deletedElements); // [2, 6]
