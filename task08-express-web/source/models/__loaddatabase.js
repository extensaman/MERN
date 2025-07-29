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

const addData = (todo) => {
  todo._id = getObjectId();
  database.todos.push(todo);
  saveDatabase();
};

const getItemIndex = (id) => {
  return database.todos.findIndex((el) => el._id === id);
};

const setDoneItem = (id) => {
  const index = getItemIndex(id);
  if (index > -1) {
    database.todos[index].done = true;
    saveDatabase();
    return true;
  } else {
    return false;
  }
};

const deleteItem = (id) => {
  const index = getItemIndex(id);
  if (index > -1) {
    database.todos.splice(index, 1);
    saveDatabase();
    return true;
  } else {
    return false;
  }
};

export { database, saveDatabase, getObjectId, addData };
