import { solution } from "./solution.ts";
import { runSolution } from "../../io/utils.ts";

describe("Solution", () => {
  it("Case 1", () => {
    const plainInput = `3
1 2 3
4 5 6`;
    const expectedOutput = `1 4 2 5 3 6`;

    const output = runSolution(solution, plainInput);

    expect(output).toBe(expectedOutput);
  });

  it("Case 2", () => {
    const plainInput = `1
1
2`;
    const expectedOutput = `1 2`;

    const output = runSolution(solution, plainInput);

    expect(output).toBe(expectedOutput);
  });
});
