import type { Solution } from "../../io/types";

type Input = [number, number[], number[]];
type Output = number[];

export const solution: Solution<Input, Output> = {
  solution: ([n, arr1, arr2]) => {
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(arr1[i]);
      arr.push(arr2[i]);
    }
    return arr;
  },
  transformInput: ([n, arr1, arr2]) => {
    return [
      Number(n),
      arr1!.split(" ").map(Number),
      arr2!.split(" ").map(Number),
    ];
  },
  transformOutput: (arr) => arr.join(" "),
};
