import type { RawInput, RawOutput, Solution } from "./types.ts";

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