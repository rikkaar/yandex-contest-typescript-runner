import * as fs from "fs/promises";
import * as readline from "readline";

type FileOutputParams = {
  type: "file";
  /** @default output.txt */
  outputLocation?: string;
};

type FileInputParams = {
  type: "file";
  /** @default input.txt */
  inputLocation?: string;
};

type StdInParams = {
  type: "stdin";
};

type StdOutParams = {
  type: "stdout";
};

type InputParams = StdInParams | FileInputParams;
type OutputParams = StdOutParams | FileOutputParams;

type Input = string[];

type Output = string;

type SolutionFunction<I, O> = (args: I) => O;

type TransformInput<I> = (input: Input) => I;

type TransformOutput<O> = (output: O) => Output;

export type Solution<I, O> = {
  solution: SolutionFunction<I, O>;
  transformInput: TransformInput<I>;
  transformOutput: TransformOutput<O>;
};

export const readInputFromFile = async (path: string): Promise<Input> => {
  const rawInput = await fs.readFile(path, { encoding: "utf8" });

  return rawInput.split(/\r?\n/);
};

export const readInputFromStdin = async (): Promise<Input> => {
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

export const writeOutputToFile = async (
  path: string,
  output: Output
): Promise<void> => {
  await fs.writeFile(path, output);
};

export const writeOutputToStdout = (output: Output): void => {
  console.log(output);
};

export const runner = async (
  solution: Solution<unknown, unknown>,
  /** @default stdin */
  inputSource: InputParams = { type: "stdin" },
  /** @default stdout */
  outputTarget: OutputParams = { type: "stdout" }
) => {
  let inputLines: Input;

  if (inputSource.type === "file") {
    inputLines = await readInputFromFile(
      inputSource.inputLocation ?? "input.txt"
    );
  } else {
    inputLines = await readInputFromStdin();
  }

  const parsedInput = solution.transformInput(inputLines);
  const result = solution.solution(parsedInput);
  const formattedOutput = solution.transformOutput(result);

  if (outputTarget.type === "file") {
    await writeOutputToFile(
      outputTarget.outputLocation ?? "output.txt",
      formattedOutput
    );
  } else {
    writeOutputToStdout(formattedOutput);
  }
};
