import * as fs from "fs/promises";
import * as readline from "readline";
export const readInputFromFile = async (path) => {
    const rawInput = await fs.readFile(path, { encoding: "utf8" });
    return rawInput.split(/\r?\n/);
};
export const readInputFromStdin = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
    });
    const lines = [];
    for await (const line of rl) {
        lines.push(line);
    }
    rl.close();
    return lines;
};
export const writeOutputToFile = async (path, output) => {
    await fs.writeFile(path, output);
};
export const writeOutputToStdout = (output) => {
    console.log(output);
};
export const runner = async (solution, 
/** @default stdin */
inputSource = { type: "stdin" }, 
/** @default stdout */
outputTarget = { type: "stdout" }) => {
    let inputLines;
    if (inputSource.type === "file") {
        inputLines = await readInputFromFile(inputSource.inputLocation ?? "input.txt");
    }
    else {
        inputLines = await readInputFromStdin();
    }
    const parsedInput = solution.transformInput(inputLines);
    const result = solution.solution(parsedInput);
    const formattedOutput = solution.transformOutput(result);
    if (outputTarget.type === "file") {
        await writeOutputToFile(outputTarget.outputLocation ?? "output.txt", formattedOutput);
    }
    else {
        writeOutputToStdout(formattedOutput);
    }
};
