// task 1

// one-line variant

const oneLineAdder = (n) => (x) => x === undefined ? n : oneLineAdder(n + x);

// rewritten with ternany variant

function add(n) {
  const adder = function (x) {
    return x === undefined ? n : add(n + x);
  };

  return adder;
}

console.log(add(2)(3)(5)(7)()); // 17
console.log(oneLineAdder(2)(3)(5)(7)()); // 17

// task 2

const areAnagrams = (str1, str2) =>
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

function deepClone(obj) {
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;

  let clone = Array.isArray(obj) ? [] : {};

  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      clone[i] = deepClone(obj[i]);
    }
  }

  return clone;
}

console.log(deepClone(CLONE_OBJECT));

// task 4

function wrapper(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    const cacheEntry = cache.get(key);

    if (!cacheEntry) {
      const result = func(...args);
      cache.set(key, { time: Date.now(), result });
      console.log(`${result} calculated`);
      return result;
    }

    const age = Date.now() - cacheEntry.time;
    const expireTime = 60 * 1000;

    if (age > expireTime) {
      const result = func(...args);
      cache.set(key, { time: Date.now(), result });
      console.log(`${result} recalculated`);
      return result;
    }

    console.log(`${cacheEntry.result} from cache`);
    return cacheEntry.result;
  };
}

const calc = (a, b, c) => a + b + c;
const cachedCalc = wrapper(calc);

cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache
