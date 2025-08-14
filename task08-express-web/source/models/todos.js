import { database, saveDatabase, getObjectId } from "./__loaddatabase.js";

const todos = database.todos;

export function getList(user) {
  return todos.filter((el) => el.user === user);
}

export const getItem = (id, user) =>
  todos.find((el) => el._id === id && el.user === user);

export const addData = (todo) => {
  todo._id = getObjectId();
  todos.push(todo);
  saveDatabase();
};

export const getItemIndex = (id, user) => {
  return todos.findIndex((el) => el._id === id && el.user === user);
};

export const setDoneItem = (id, user) => {
  const index = getItemIndex(id, user);
  if (index > -1) {
    todos[index].done = true;
    saveDatabase();
    return true;
  } else {
    return false;
  }
};

export const deleteItem = (id, user) => {
  const index = getItemIndex(id, user);
  if (index > -1) {
    todos.splice(index, 1);
    saveDatabase();
    return true;
  } else {
    return false;
  }
};
