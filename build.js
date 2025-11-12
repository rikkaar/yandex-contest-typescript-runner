const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"], // основной файл
    bundle: true, // объединяем импорты
    outfile: "final.js", // финальный файл
    platform: "node", // оставляем require для Node
    target: "esnext", // минимальная трансформация
    format: "cjs", // CommonJS
    external: ["fs", "readline"], // не заменяем require на внутренние импорты
  })
  .catch(() => process.exit(1));
