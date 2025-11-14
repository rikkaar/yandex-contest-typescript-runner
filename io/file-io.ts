import type { RawInput, RawOutput, Solution } from "./types";

const fs = require("fs/promises");

const readInputFromFile = async (inputPath: string): Promise<RawInput> => {
  const plainText = await fs.readFile(inputPath, { encoding: "utf8" });

  return plainText.split(/\r?\n/);
};

const writeOutputToFile = async (
  outputPath: string,
  output: RawOutput
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
