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
function deepClone<T extends object>(obj: T): T {
  const cloneObj = {} as T;

  for (const key in obj) {
    const value = obj[key as keyof T];

    if (value && typeof value === "object") {
      cloneObj[key as keyof T] = deepClone(value);
    } else {
      cloneObj[key as keyof T] = value;
    }
  }

  return cloneObj;
}

console.log(deepClone(CLONE_OBJECT));

// task 4

type SumFunctionCachedValue = {
  ms: number;
  sum: number;
};

function wrapper(func: (...args: number[]) => number) {
  const cache = new Map<string, SumFunctionCachedValue>();

  return function (...args: number[]): number {
    const key = JSON.stringify(args);
    const cacheEntry = cache.get(key);

    if (!cacheEntry) {
      const sum = func(...args);
      cache.set(key, { ms: Date.now(), sum });
      console.log(`${sum} calculated`);
      return sum;
    }

    const age = Date.now() - cacheEntry.ms;
    const expireTime = 60 * 1000;

    if (age > expireTime) {
      const sum = func(...args);
      cache.set(key, { ms: Date.now(), sum });
      console.log(`${sum} recalculated`);
      return sum;
    }

    console.log(`${cacheEntry.sum} from cache`);
    return cacheEntry.sum;
  };
}

const calc = (a: number, b: number, c: number): number => a + b + c;

const cachedCalc = wrapper(calc);

cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache
