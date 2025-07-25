import { getList } from "../models/todos.js";

export const mainPage = (req, res) => {
  const list = getList();
  let s =
    "<!doctype html>" +
    "<html>" +
    " <head>" +
    ' <meta charset="UTF-8">' +
    " <title>Список запланированных дел</title>" +
    " </head>" +
    " <body>" +
    `<p>${req.ip}</p>` +
    " <h1>Запланированные дела</h1>";
  for (let el of list) {
    const date = new Date(el.createdAt);
    s +=
      `<h2><a href="/${el._id}/">${el.title}</a></h2>` +
      `<p>${el.desc}</p>` +
      `<p>${date.toLocaleString()}</p>` +
      `<p>&nbsp</p>`;
  }
  s += " </body>" + "</html>";
  res.send(s);
};
