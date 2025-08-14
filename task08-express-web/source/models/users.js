import { database, getObjectId, saveDatabase } from "./__loaddatabase.js";

export const getUser = (name) => {
  return database.users.find((user) => user.username === name);
};

export const addUser = (user) => {
  user._id = getObjectId();
  database.users.push(user);
  saveDatabase();
};
