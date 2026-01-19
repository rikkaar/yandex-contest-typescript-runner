import type { RawInput, RawOutput, Solution, SolutionFunction } from "./types.ts";

const transformPlainTextToRawInput = (plainText: string): RawInput => {
  return plainText.split(/\r?\n/);
};

export const runSolution = (
  solution: Solution<any, any>,
  plainInput: string
): RawOutput => {
  const rawInput = transformPlainTextToRawInput(plainInput);
  const input = solution.transformInput(rawInput);
  const result = solution.solution(input);
  const output = solution.transformOutput(result);
  return output;
};

export class Node {
  value: string | null;
  next: Node | null;

  constructor(value: string | null = null, next: Node | null = null) {
    this.value = value;
    this.next = next ?? null;
  }
}