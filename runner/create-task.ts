#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs/promises";

const args = process.argv.slice(2);
const taskName = args[0];

if (!taskName) {
  console.error("Не указано имя задачи");
  process.exit(1);
}

(async () => {
  const taskDir = path.join("src", taskName);

  try {
    await fs.access(taskDir);
    console.error(`Директория уже существует: ${taskDir}`);
    process.exit(1);
  } catch {}

  await fs.mkdir(taskDir, { recursive: true });

  const templateDir = path.join("_template");
  await fs.cp(templateDir, taskDir, { recursive: true });

  console.log(`Содержимое директории ${templateDir} скопировано в ${taskDir}`);
})();
