import { runSolution } from "../../io/utils.ts";
import { getPlainTextFromFile } from "../../runner/utils.ts";
import { solution } from "./solution.ts";

describe("solution logic", () => {
  it("Работа исключительно с подготовленными input/output", () => {
    const result = solution.solution([2, 2]);

    expect(result).toBe(4);
  });

  it("Проверка с этапам подготовки rawInput", () => {
    const input = solution.transformInput(["2 2"]);
    const result = solution.solution(input);

    expect(result).toBe(4);
  });

  it("Проверка с этапам подготовки rawInput/rawOutput", () => {
    const input = solution.transformInput(["2 2"]);
    const result = solution.solution(input);
    const output = solution.transformOutput(result);

    expect(output).toBe("4");
  });

  it("Так будет проверяться в Яндекс.Контесте через std: Полный цикл тестирования plainInput->rawInput->input->output->rawOutput", () => {
    const plainInput = `2 2`;
    const expectedOutput = `4`;

    const output = runSolution(solution, plainInput);

    expect(output).toBe(expectedOutput);
  });

  it("Так будет проверяться в Яндекс.Контесте через file: Полный цикл тестирования plainInput->rawInput->input->output->rawOutput", async () => {
    const plainInput = await getPlainTextFromFile("input.txt", __dirname);
    const expectedOutput = await getPlainTextFromFile("output.txt", __dirname);

    const output = runSolution(solution, plainInput);

    expect(output).toBe(expectedOutput);
  });
});
