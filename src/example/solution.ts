import type { Solution } from "../../io/types";

type I = [number, number];
type O = number;

export const solution: Solution<I, O> = {
  solution: ([a, b]) => {
    return a + b;
  },
  transformInput: ([input]) => {
    const [a, b] = input.split(" ");
    return [Number(a), Number(b)];
  },
  transformOutput: String,
};
