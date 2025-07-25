import { database } from "./__loaddatabase.js";

const todos = database.todos;

export const getList = () => todos;
