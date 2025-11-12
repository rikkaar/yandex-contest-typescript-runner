"use strict";

// io/file-io.ts
var fs = require("fs/promises");
var readInputFromFile = async (inputPath) => {
  const rawInput = await fs.readFile(inputPath, { encoding: "utf8" });
  return rawInput.split(/\r?\n/);
};
var writeOutputToFile = async (outputPath, output) => {
  await fs.writeFile(outputPath, output);
};
var fileRunner = async (solution2, inputLocation = "input.txt", outputLocation = "output.txt") => {
  const inputLines = await readInputFromFile(inputLocation);
  const parsedInput = solution2.transformInput(inputLines);
  const result = solution2.solution(parsedInput);
  const formattedOutput = solution2.transformOutput(result);
  await writeOutputToFile(outputLocation, formattedOutput);
};

// src/example/solution.ts
var solution = {
  solution: ([a, b]) => {
    return a + b;
  },
  transformInput: ([input]) => {
    const [a, b] = input.split(" ");
    return [Number(a), Number(b)];
  },
  transformOutput: String
};

// src/example/solution.temp.ts
(async () => {
  await fileRunner(solution, "input.txt", "output.txt");
})();
