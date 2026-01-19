"use strict";

// src/22779-B/solution.ts
var solution = ([node]) => {
  let current = node;
  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
};

// src/22779-B/solution.temp.ts
globalThis.solution = function(...args) {
  return solution(args);
};
