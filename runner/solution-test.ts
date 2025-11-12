#!/usr/bin/env ts-node

import * as path from "path";
import { exec } from "child_process";
import { Command } from "commander";
import { resolveSolutionAbsPath, getSolutionName } from "./utils.ts";

const program = new Command();

program
  .argument("[solutionPath]", "Путь до файла с решением")
  .parse(process.argv);

const [solutionArg] = program.args;

(async () => {
  const solutionAbsPath = await resolveSolutionAbsPath(solutionArg);
  const solutionDir = path.dirname(solutionAbsPath);
  const solutionName = getSolutionName(solutionAbsPath);
  const testFile = path.join(solutionDir, solutionName + ".test.ts");

  exec(`npx jest "${testFile}" --colors`, (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    process.exit(err ? 1 : 0);
  });
})();
