import createError from "http-errors";
import { join } from "node:path";
import { rm } from "node:fs/promises";

import {
  getList,
  getItem,
  addData,
  setDoneItem,
  deleteItem,
} from "../models/todos.js";
import addendumUploader from "../uploaders.js";
import { currentDir } from "../utility.js";

export const mainPage = (req, res) => {
  let list = getList(); // ....................................... 1
  if (req.cookies.doneAtLast === "1") {
    // ....................... 1
    list = [...list]; // ....................................... 2
    list.sort((el1, el2) => {
      // ............................... 3
      const date1 = new Date(el1.createdAt);
      const date2 = new Date(el2.createdAt);
      const done1 = el1.done || false;
      const done2 = el2.done || false;
      const doneDiff = done1 - done2;
      if (doneDiff != 0) return doneDiff;
      else return date1 - date2;
    });
  }
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
  if (req.file) todo.addendum = req.file.filename;
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

export const remove = async (req, res, next) => {
  try {
    const item = getItem(req.params.id);
    if (!item) {
      throw (404, "Запрошенное дело не существует");
    }
    if (item.addendum) {
      // Удаляем ранее заруженный файл
      await rm(join(currentDir, "storage", "uploaded", item.addendum));
    }
    deleteItem(item._id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

export const setOrder = (req, res) => {
  res.cookie("doneAtLast", req.body.done_at_last);
  res.redirect("/");
};

export const addendumWrapper = (req, res, next) => {
  addendumUploader(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        req.errorObj = {
          addendum: {
            msg: "Допускаются файлы не более 100 кБ",
          },
        };
        next();
      } else {
        next(err);
      }
    } else {
      next();
    }
  });
};
