#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs/promises";
import { Command } from "commander";

const program = new Command();

program
  .argument("<taskName>", "Название директории для задачи")
  .option("-t, --type <type>", "Тип шаблона (default|make)", "default")
  .parse(process.argv);

const [taskName] = program.args;
const options = program.opts();

(async () => {
  const taskDir = path.join("src", taskName);

  try {
    await fs.access(taskDir);
    console.error(`Директория уже существует: ${taskDir}`);
    process.exit(1);
  } catch {}

  await fs.mkdir(taskDir, { recursive: true });

  const templateType = options.type === "make" ? "_template-make" : "_template";
  const templateDir = path.join(templateType);
  await fs.cp(templateDir, taskDir, { recursive: true });

  console.log(`Содержимое директории ${templateDir} скопировано в ${taskDir}`);
})();
