import { runSolution } from "../../io/utils.ts";
import { getPlainTextFromFile } from "../../runner/utils.ts";
import { solution } from "./solution.ts";

describe("Solution", () => {
  it("Std. Case 1", () => {
    const plainInput = ``;
    const expectedOutput = ``;

    const output = runSolution(solution, plainInput);

    expect(output).toBe(expectedOutput);
  });

  it("File. Case 1", async () => {
    const plainInput = await getPlainTextFromFile("input.txt", __dirname);
    const expectedOutput = await getPlainTextFromFile("output.txt", __dirname);

    const output = runSolution(solution, plainInput);

    expect(output).toBe(expectedOutput);
  });
});
