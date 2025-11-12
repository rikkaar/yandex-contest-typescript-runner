#!/usr/bin/env ts-node

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
  } catch {
    await fs.mkdir(taskDir, { recursive: true });
  }

  const templateDir = path.join("template");

  const filesToCopy = ["solution.ts", "solution.test.ts", "README.md"];

  for (const file of filesToCopy) {
    const srcFile = path.join(templateDir, file);
    const destFile = path.join(taskDir, file);
    await fs.copyFile(srcFile, destFile);
  }

  console.log(`Файлы созданы в ${taskDir}`);
})();
