import { solution } from "./solution.ts";

describe("solution logic", () => {
  it("Рекомендованный формат написания теста: Работа исключительно с подготовленными данными", () => {
    const result = solution.solution([2, 2]);

    expect(result).toBe(4);
  });

  it("Проверка с этапом предобработки", () => {
    const input = solution.transformInput(["2 2"]);
    const result = solution.solution(input);

    expect(result).toBe(4);
  });

  it("Так будет проверяться в Яндекс.Контесте: Проверка с этапами подготовки данных", () => {
    const input = solution.transformInput(["2 2"]);
    const result = solution.solution(input);
    const output = solution.transformOutput(result);

    expect(output).toBe("4");
  });
});
