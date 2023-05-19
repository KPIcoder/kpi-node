// task 1

function add(n) {
  const adder = function (x) {
    if (x === undefined) {
      return n;
    } else {
      return add(n + x);
    }
  };

  return adder;
}

console.log(add(2)(3)(5)(7)()); // 17

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
  let cache = {};

  return function (...args) {
    let key = JSON.stringify(args);

    if (!cache[key]) {
      cache[key] = func(...args);
      console.log(`${cache[key]} calculated`);
    } else {
      console.log(`${cache[key]} from cache`);
    }

    return cache[key];
  };
}

const calc = (a, b, c) => a + b + c;
const cachedCalc = wrapper(calc);

cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache
