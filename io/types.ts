export type RawInput = string[];

export type RawOutput = string;

type SolutionFunction<I, O> = (args: I) => O;

type TransformInput<I> = (rawInput: RawInput) => I;

type TransformOutput<O> = (output: O) => RawOutput;

export type Solution<I, O> = {
  solution: SolutionFunction<I, O>;
  transformInput: TransformInput<I>;
  transformOutput: TransformOutput<O>;
};
