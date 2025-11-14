import * as path from "path";
import * as fs from "fs/promises";

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

export const getPlainTextFromFile = async (
  filePath: string,
  baseDir: string
): Promise<string> => {
  const absPath = path.resolve(baseDir, filePath);
  return fs.readFile(absPath, { encoding: "utf8" });
};
