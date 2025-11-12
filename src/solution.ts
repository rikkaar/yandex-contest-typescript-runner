import type { Solution } from "./io";

type Input = [number, number];
type Output = number;

export const solution: Solution<Input, Output> = {
  solution: ([a, b]) => {
    return a + b;
  },
  transformInput: (input) => {
    return [Number(input[0]), Number(input[1])];
  },
  transformOutput: String,
};
