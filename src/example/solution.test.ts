import { solution } from "./solution.ts";

describe("solution logic", () => {
  it("adds two numbers", () => {
    const input = solution.transformInput(["2", "3"]);
    const result = solution.solution(input);
    const output = solution.transformOutput(result);

    expect(output).toBe("5");
  });

  it("handles negative numbers", () => {
    const input = solution.transformInput(["-1", "4"]);
    const result = solution.solution(input);

    expect(result).toBe(3);
  });
});
