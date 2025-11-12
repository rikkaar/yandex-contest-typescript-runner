const fs = require("fs/promises");
const readline = require("readline");

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

const readInputFromFile = async (inputPath: string): Promise<Input> => {
  const rawInput = await fs.readFile(inputPath, { encoding: "utf8" });

  return rawInput.split(/\r?\n/);
};

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

const writeOutputToFile = async (
  outputPath: string,
  output: Output
): Promise<void> => {
  await fs.writeFile(outputPath, output);
};

const writeOutputToStdout = (output: Output): void => {
  console.log(output);
};

export const runner = async (
  solution: Solution<any, any>,
  /** @default stdin */
  inputSource: InputParams,
  /** @default stdout */
  outputTarget: OutputParams
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
