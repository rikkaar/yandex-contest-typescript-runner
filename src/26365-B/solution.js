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

// src/26365-B/solution.ts
var solution = {
  solution: ([n, arr1, arr2]) => {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(arr1[i]);
      arr.push(arr2[i]);
    }
    return arr;
  },
  transformInput: ([n, arr1, arr2]) => {
    return [
      Number(n),
      arr1.split(" ").map(Number),
      arr2.split(" ").map(Number)
    ];
  },
  transformOutput: (arr) => arr.join(" ")
};

// src/26365-B/solution.temp.ts
(async () => {
  await fileRunner(solution, "input.txt", "output.txt");
})();
