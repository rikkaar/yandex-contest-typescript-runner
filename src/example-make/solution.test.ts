import { solution, type Input, type Output } from "./solution.ts";
import { Node } from "../../io/utils.ts";

describe("Solution (console output)", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("Std. Case 1", () => {
    const input = [new Node("task1", new Node("task2", new Node("task3")))] satisfies Input;
    const expectedLogs = ["task1", "task2", "task3"];

    solution(input);

    const actualLogs = consoleLogSpy.mock.calls.map(call => call[0]);
    expect(actualLogs).toEqual(expectedLogs);
  });

  it("Empty list", () => {
    const input = [new Node("single")] satisfies Input;
    const expectedLogs = ["single"];

    solution(input);

    const actualLogs = consoleLogSpy.mock.calls.map(call => call[0]);
    expect(actualLogs).toEqual(expectedLogs);
  });
});
