export type Input = [string, ...string[]];

export type Output = string;

type SolutionFunction<I, O> = (args: I) => O;

type TransformInput<I> = (input: Input) => I;

type TransformOutput<O> = (output: O) => Output;

export type Solution<I, O> = {
  solution: SolutionFunction<I, O>;
  transformInput: TransformInput<I>;
  transformOutput: TransformOutput<O>;
};
