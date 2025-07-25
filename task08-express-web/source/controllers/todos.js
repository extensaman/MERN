import { getList, getItem } from "../models/todos.js";

export const mainPage = (_, res) => {
  const list = getList();
  let s =
    "<!doctype html>" +
    "<html>" +
    " <head>" +
    ' <meta charset="UTF-8">' +
    " <title>Список запланированных дел</title>" +
    " </head>" +
    " <body>" +
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

export const detailPage = (req, res) => {
  const item = getItem(req.params.id);
  if (!item) {
    errorPage(req, res);
    return;
  }
  res.send(
    "<!doctype html>" +
      "<html>" +
      " <head>" +
      ' <meta charset="UTF-8">' +
      ` <title>${item.title} :: Список запланированных дел</title>` +
      " </head>" +
      " <body>" +
      ` <h1>${item.title}</h1>` +
      ` <p>${item.desc}</p>` +
      ` <p>Создано: ${new Date(item.createdAt).toLocaleString()}</p>` +
      " </body>" +
      "</html>"
  );
};

const errorPage = (_, res) => {
  res
    .status(404)
    .send(
      "<!doctype html>" +
        "<html>" +
        " <head>" +
        ' <meta charset="UTF-8">' +
        " <title>Ошибка</title>" +
        " </head>" +
        " <body>" +
        " <h1>Ошибка!</h1>" +
        " <p>Запрошенная страница не существует.</p>" +
        " </body>" +
        "</html>"
    );
};
