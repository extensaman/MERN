import createError from "http-errors";

import {
  getList,
  getItem,
  addData,
  setDoneItem,
  deleteItem,
} from "../models/todos.js";

export const mainPage = (req, res) => {
  let list = getList(); // ....................................... 1
  if (req.query.search) {
    // ..................................... 2
    const q = req.query.search.toLowerCase(); // ............... 3
    list = list.filter((el) => {
      if (el.title.toLowerCase().includes(q))
        // ............. 4
        return true;
      else if (el.desc) return el.desc.toLowerCase().includes(q); // ... 5
      else return false;
    });
  }
  res.render("main", { todos: list, title: "Главная" });
};

export const detailPage = (req, res) => {
  const todo = getItem(req.params.id);
  if (!todo) {
    throw createError(404, "Запрошенное дело не существует");
  }
  res.render("detail", { title: "Детали", todo: todo });
};

export const addItem = (_, res) => {
  res.render("add", { title: "Добавить" });
};

export const add = (req, res) => {
  const todo = {
    title: req.body.title,
    desc: req.body.desc || "",
    createdAt: new Date().toString(),
  };
  addData(todo);
  res.redirect("/");
};

export const setDone = (req, res) => {
  if (setDoneItem(req.params.id)) {
    res.redirect("/");
  } else {
    throw createError(404, "Запрошенное дело не существует");
  }
};

export const remove = (req, res) => {
  if (deleteItem(req.params.id)) {
    res.redirect("/");
  } else {
    throw createError(404, "Запрошенное дело не существует");
  }
};
