import { database, saveDatabase, getObjectId } from "./__loaddatabase.js";

const todos = database.todos;

export const getList = () => todos;
export const getItem = (id) => todos.find((el) => el._id === id);

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
