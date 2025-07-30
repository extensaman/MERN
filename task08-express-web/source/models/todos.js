import { database, saveDatabase } from "./__loaddatabase.js";

const todos = database.todos;

export const getList = () => todos;
export const getItem = (id) => todos.find((el) => el._id === id);

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

export const addData = (todo) => {
  todo._id = getObjectId();
  todos.push(todo);
  saveDatabase();
};

export const getItemIndex = (id) => {
  return todos.findIndex((el) => el._id === id);
};

export const setDoneItem = (id) => {
  const index = getItemIndex(id);
  if (index > -1) {
    todos[index].done = true;
    saveDatabase();
    return true;
  } else {
    return false;
  }
};

export const deleteItem = (id) => {
  const index = getItemIndex(id);
  if (index > -1) {
    todos.splice(index, 1);
    saveDatabase();
    return true;
  } else {
    return false;
  }
};
