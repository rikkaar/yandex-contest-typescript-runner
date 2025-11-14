import * as fs from "fs/promises";
import * as path from "path";

const isTaskId = (arg: string): boolean => {
  return !arg.includes("/") && !arg.includes(".");
};

export const resolveTargetFileAbsPath = async (
  arg: string,
  fileName: string
): Promise<string> => {
  let targetPath: string;

  if (isTaskId(arg)) {
    targetPath = path.resolve("src", arg, fileName);
  } else {
    targetPath = path.resolve(arg);
  }

  try {
    await fs.access(targetPath);
    console.error(`Файл ${targetPath} не найден`);
    process.exit(1);
  } catch {}

  return targetPath;
};

export const resolveRunnerRelPath = (
  solutionDir: string,
  runnerType: "file" | "std"
): string => {
  const runnerAbsPath = path.resolve(
    "io",
    runnerType === "file" ? "file-io" : "std-io"
  );
  return path.relative(solutionDir, runnerAbsPath);
};
