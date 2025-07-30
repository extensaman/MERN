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
  res.render("main", { req: req, todos: list, title: "Главная" });
};

export const detailPage = (req, res) => {
  const todo = getItem(req.params.id);
  if (!todo) {
    errorPage(req, res);
    return;
  }
  res.render("detail", { title: "Детали", todo: todo });
};

const errorPage = (_, res) => {
  res.status(404).render("error", { title: "Error" });
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
    errorPage(req, res);
  }
};

export const remove = (req, res) => {
  if (deleteItem(req.params.id)) {
    res.redirect("/");
  } else {
    errorPage(req, res);
  }
};
