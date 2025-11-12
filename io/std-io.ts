import type { Input, Output, Solution } from "./types";

const readline = require("readline");

const readInputFromStdin = async (): Promise<Input> => {
  const rl = readline.createInterface({
    input: process.stdin,
  });
  const lines: Input = [];

  for await (const line of rl) {
    lines.push(line);
  }

  rl.close();

  return lines;
};

const writeOutputToStdout = (output: Output): void => {
  console.log(output);
};

export const stdRunner = async (solution: Solution<any, any>) => {
  const inputLines = await readInputFromStdin();

  const parsedInput = solution.transformInput(inputLines);
  const result = solution.solution(parsedInput);
  const formattedOutput = solution.transformOutput(result);

  writeOutputToStdout(formattedOutput);
};
