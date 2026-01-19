import type { SolutionFunction } from "../../io/types";
import { Node } from "../../io/utils";

export type Input = [Node];
export type Output = void;

export const solution: SolutionFunction<Input, Output> = ([node]) => {
  let current: Node | null = node;
  while (current !== null) {
    console.log(current.value!)
    current = current.next;
  }
};
