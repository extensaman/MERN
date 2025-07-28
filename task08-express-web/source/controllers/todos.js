import { getList, getItem } from "../models/todos.js";

export const mainPage = (_, res) => {
  res.render("main", { todos: getList(), title: "Главная" });
};

export const detailPage = (req, res) => {
  const todo = getItem(req.params.id);
  if (!todo) {
    errorPage(req, res);
    return;
  }
  res.render("detail", { title: "Расширенная информация", todo: todo });
};

const errorPage = (_, res) => {
  res.status(404).render("error", { title: "Error" });
};
