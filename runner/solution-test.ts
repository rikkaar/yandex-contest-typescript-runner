#!/usr/bin/env node

import * as path from "path";
import { exec } from "child_process";
import { Command } from "commander";
import { resolveTargetFileAbsPath } from "./utils.ts";

const program = new Command();

program
  .argument(
    "<testPath>",
    "Путь до файла с тестами или taskId (например: example или ./src/example/solution.test.ts)"
  )
  .parse(process.argv);

const [testArg] = program.args;

(async () => {
  const testFile = await resolveTargetFileAbsPath(testArg, "solution.test.ts");

  exec(`npx jest "${testFile}" --colors`, (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    process.exit(err ? 1 : 0);
  });
})();
