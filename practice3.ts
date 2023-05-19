// task 1

type RecursiveSumFunction = {
  (x: number): RecursiveSumFunction;
  (): number;
};

function add(n: number): RecursiveSumFunction {
  const adder = ((x?: number) => {
    if (x !== undefined) {
      return add(n + x);
    } else {
      return n;
    }
  }) as RecursiveSumFunction;

  return adder;
}

console.log(add(2)(3)(5)(7)()); // 17

// task 2

const areAnagrams = (str1: string, str2: string): boolean =>
  str1.split("").sort().join("") === str2.split("").sort().join("");

console.log(areAnagrams("aabb", "abba")); // true

// task 3

type CustomObject = { [key: string]: CustomValue };
type CustomArray = CustomValue[];
type CustomValue =
  | string
  | number
  | boolean
  | Date
  | CustomArray
  | CustomObject
  | null;

const CLONE_OBJECT = {
  a: 32,
  b: {
    c: ["Apple", "Pear"],
  },
  d: {
    e: {
      date: new Date(Date.now()).toISOString(),
    },
  },
};
function deepClone<T extends CustomValue>(value: T): T {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return (value as CustomArray).map(deepClone) as T;
    } else {
      const result: CustomObject = {};
      for (const key in value as CustomObject) {
        result[key] = deepClone((value as CustomObject)[key]);
      }
      return result as T;
    }
  } else {
    return value;
  }
}

console.log(deepClone(CLONE_OBJECT));

// task 4

type Func = (...args: number[]) => number;
type WrappedFunc = (...args: number[]) => number;

const wrapper = (func: Func): WrappedFunc => {
  let cache: Record<string, number> = {};

  return function (...args: number[]): number {
    let key = JSON.stringify(args);

    if (!cache[key]) {
      cache[key] = func(...args);
      console.log(`${cache[key]} calculated`);
    } else {
      console.log(`${cache[key]} from cache`);
    }

    return cache[key];
  };
};

const calc = (a: number, b: number, c: number): number => a + b + c;
const cachedCalc = wrapper(calc);

cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache
