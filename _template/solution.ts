import type { Solution } from "../../io/types";

type Input = [any];
type Output = any;

export const solution: Solution<Input, Output> = {
  solution: ([]) => {
    return "";
  },
  transformInput: ([]) => {
    return [undefined];
  },
  transformOutput: String,
};
