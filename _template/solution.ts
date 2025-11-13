import type { Solution } from "../../io/types";

type I = any[];
type O = any;

export const solution: Solution<I, O> = {
  solution: ([]) => {
    return undefined;
  },
  transformInput: ([]) => {
    return [];
  },
  transformOutput: String,
};
