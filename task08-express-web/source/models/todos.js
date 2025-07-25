import { database } from "./__loaddatabase.js";

const todos = database.todos;

export const getList = () => todos;
export const getItem = (id) => todos.find((el) => el._id === id);
