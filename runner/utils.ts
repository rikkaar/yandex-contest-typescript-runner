import * as fs from "fs/promises";
import * as path from "path";

export const resolveSolutionAbsPath = async (solutionPath?: string) => {
  if (!solutionPath) throw new Error("Не указан путь до файла с решением");
  const solutionAbsPath = path.resolve(solutionPath);
  try {
    await fs.access(solutionAbsPath);
  } catch {
    throw new Error(`Файл решения не найден: ${solutionAbsPath}`);
  }
  return solutionAbsPath;
};

export const getSolutionName = (solutionPath: string) => {
  return path.basename(solutionPath, ".ts");
};

export const getRunnerRelPath = (
  solutionDir: string,
  runnerType: "file" | "std"
) => {
  const runnerAbsPath = path.resolve(
    "io",
    runnerType === "file" ? "file-io" : "std-io"
  );
  let runnerRelPath = path
    .relative(solutionDir, runnerAbsPath)
    .replace(/\\/g, "/");
  if (!runnerRelPath.startsWith(".")) runnerRelPath = "./" + runnerRelPath;
  return runnerRelPath;
};
