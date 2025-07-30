import { join } from "node:path";
import { readFileSync } from "node:fs";
import { currentDir } from "../utility.js";
import { writeFile } from "node:fs/promises";

const fullPath = join(currentDir, "data", "todos.json");

const dataRaw = readFileSync(fullPath, "utf8");
const database = JSON.parse(dataRaw);

const saveDatabase = () => {
  const data = JSON.stringify(database);
  writeFile(fullPath, data, "utf8");
};

export { database, saveDatabase };
