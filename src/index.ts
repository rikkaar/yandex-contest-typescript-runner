import { runner } from "./io";
import { solution } from "./solution";

(async () => {
  await runner(solution, { type: "file" }, { type: "file" });
})();
