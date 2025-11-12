#!/usr/bin/env ts-node

import * as path from "path";
import * as fs from "fs/promises";
import * as esbuild from "esbuild";
import { Command } from "commander";
import {
  resolveSolutionAbsPath,
  getSolutionName,
  getRunnerRelPath,
} from "./utils.ts";

const program = new Command();

program
  .argument("[solutionPath]", "Путь до файла с решением")
  .option("-r, --runner <type>", "Тип раннера (file|std)", "file")
  .option("-i, --input <path>", "Путь до входного файла (fileRunner)")
  .option("-o, --output <path>", "Путь до выходного файла (fileRunner)")
  .option("-O, --outfile <filename>", "Имя итогового JS-файла")
  .parse(process.argv);

const options = program.opts();
const [solutionArg] = program.args;

(async () => {
  const solutionAbsPath = await resolveSolutionAbsPath(solutionArg);
  const solutionDir = path.dirname(solutionAbsPath);
  const solutionName = getSolutionName(solutionAbsPath);

  if (!["file", "std"].includes(options.runner)) {
    throw new Error(`Неверный тип раннера. Допустимые значения: "file", "std"`);
  }

  const runnerType = options.runner === "std" ? "stdRunner" : "fileRunner";
  const runnerRelPath = getRunnerRelPath(solutionDir, options.runner);

  const tempTS = `
import { ${runnerType} } from "${runnerRelPath}";
import { solution } from "./${solutionName}";

(async () => {
  await ${runnerType}(solution${
    runnerType === "fileRunner"
      ? `, "${options.input ?? "input.txt"}", "${
          options.output ?? "output.txt"
        }"`
      : ""
  });
})();
`;

  const outfileName = options.outfile ?? solutionName + ".js";
  const outfilePath = path.join(solutionDir, outfileName);
  const tempTSPath = path.join(solutionDir, solutionName + ".temp.ts");

  await fs.writeFile(tempTSPath, tempTS);
  await esbuild.build({
    entryPoints: [tempTSPath],
    bundle: true,
    platform: "node",
    target: "esnext",
    outfile: outfilePath,
  });
  await fs.unlink(tempTSPath);
  console.log(`JS-файл создан: ${outfilePath}`);
})();
