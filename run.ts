#!/usr/bin/env ts-node

import * as path from "path";
import * as fs from "fs/promises";
import * as esbuild from "esbuild";
import { Command } from "commander";

const program = new Command();

program
  .name("run-solution")
  .description("Запуск TypeScript решения задачи с выбором раннера")
  .argument("[solutionPath]", "Путь до файла с решением") // первый аргумент необязательный
  .option("-r, --runner <type>", "Тип раннера (file|std)", "file")
  .option("-i, --input <path>", "Путь до входного файла (для fileRunner)")
  .option("-o, --output <path>", "Путь до выходного файла (для fileRunner)")
  .option("-O, --outfile <filename>", "Имя итогового JS-файла", undefined);

program.parse(process.argv);
const options = program.opts();
const [solutionArg] = program.args;

if (!solutionArg) {
  console.error("Не указан путь до файла с решением");
  process.exit(1);
}

if (!["file", "std"].includes(options.runner)) {
  console.error('Неверный тип раннера. Допустимые значения: "file", "std"');
  process.exit(1);
}

const solutionPath = path.resolve(solutionArg);
const solutionName = path.basename(solutionPath, ".ts");
const runnerType = options.runner === "std" ? "stdRunner" : "fileRunner";

// Абсолютный путь до нужного раннера
const runnerAbsPath = path.resolve(
  "io",
  options.runner === "file" ? "file-io" : "std-io"
);

// Относительный путь от директории файла решения (где будет сгенерирован JS) до раннера
const solutionDir = path.dirname(solutionPath);
let runnerRelPath = path
  .relative(solutionDir, runnerAbsPath)
  .replace(/\\/g, "/");

// Если путь не начинается с "." — добавляем "./"
if (!runnerRelPath.startsWith(".")) {
  runnerRelPath = "./" + runnerRelPath;
}
// Генерируем временный TS-код
const tempTS = `
import { ${runnerType} } from "${runnerRelPath}";
import { solution } from "./${solutionName}";

(async () => {
  await ${runnerType}(solution${
  runnerType === "fileRunner"
    ? `, "${options.input ?? "input.txt"}", "${options.output ?? "output.txt"}"`
    : ""
});
})();
`;

// Вычисляем имя и путь итогового файла
const outfileName = options.outfile ?? solutionName + ".js";
const outfilePath = path.join(path.dirname(solutionPath), outfileName);

(async () => {
  try {
    // Создаём временный TS-файл рядом с исходником
    const tempTSPath = path.join(
      path.dirname(solutionPath),
      solutionName + ".temp.ts"
    );
    await fs.writeFile(tempTSPath, tempTS);

    // Собираем его через esbuild
    await esbuild.build({
      entryPoints: [tempTSPath],
      bundle: true,
      platform: "node",
      target: "esnext",
      outfile: outfilePath,
    });

    // Удаляем временный TS
    await fs.unlink(tempTSPath);

    console.log(`JS-файл создан: ${outfilePath}`);
  } catch (err) {
    console.error("Ошибка сборки:", err);
  }
})();
