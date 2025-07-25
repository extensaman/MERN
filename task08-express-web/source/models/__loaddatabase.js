import { join } from "node:path";
import { readFileSync } from "node:fs";
import { currentDir } from "../utility.js";

const fullPath = join(currentDir, "data", "todos.json");

const dataRaw = readFileSync(fullPath, "utf8");
const database = JSON.parse(dataRaw);
export { database };
