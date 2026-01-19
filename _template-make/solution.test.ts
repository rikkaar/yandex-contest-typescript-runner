import { solution, type Input, type Output } from "./solution.ts";

describe("Solution", () => {
  it("Case 1", () => {
    const input = [] satisfies Input;
    const expectedOutput = undefined satisfies Output;

    const output = solution(input); 

    expect(output).toEqual(expectedOutput);
  });
});

// Для задач, которые выводят результат через console.log:
describe("Solution (console output)", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("Case 1", () => {
    const input = [] satisfies Input;
    const expectedLogs: string[] = [];

    solution(input);

    const actualLogs = consoleLogSpy.mock.calls.map(call => call[0]);
    expect(actualLogs).toEqual(expectedLogs);
  });
});
