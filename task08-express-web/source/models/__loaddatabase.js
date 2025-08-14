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

const getObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

export { database, saveDatabase, getObjectId };
