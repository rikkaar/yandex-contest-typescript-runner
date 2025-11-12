import type { Input, Output, Solution } from "./types";

const fs = require("fs/promises");

const readInputFromFile = async (inputPath: string): Promise<Input> => {
  const rawInput = await fs.readFile(inputPath, { encoding: "utf8" });

  return rawInput.split(/\r?\n/);
};

const writeOutputToFile = async (
  outputPath: string,
  output: Output
): Promise<void> => {
  await fs.writeFile(outputPath, output);
};

export const fileRunner = async (
  solution: Solution<any, any>,
  inputLocation: string = "input.txt",
  outputLocation: string = "output.txt"
) => {
  const inputLines = await readInputFromFile(inputLocation);

  const parsedInput = solution.transformInput(inputLines);
  const result = solution.solution(parsedInput);
  const formattedOutput = solution.transformOutput(result);

  await writeOutputToFile(outputLocation, formattedOutput);
};
