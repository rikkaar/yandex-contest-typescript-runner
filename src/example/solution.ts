import type { Solution } from "../../io/types";

// Входные параметры произвольной JS структуры
type Input = [number, number];

// Выходные параметры произвольной JS структуры
type Output = number;

export const solution: Solution<Input, Output> = {
  // Основная функция решения
  solution: ([a, b]) => {
    return a + b;
  },

  // Подготовка параметров из массива строк в иные JS структуры
  transformInput: ([input]) => {
    const [a, b] = input.split(" ");
    return [Number(a), Number(b)];
  },

  // Преобразование выходной JS Структуры в текст как его ожидает Яндекс.Контест
  transformOutput: String,
};
