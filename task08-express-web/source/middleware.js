import { matchedData, validationResult } from "express-validator";

export const handleErrors = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty() || req.errorObj) {
    // Объединяем в один объект ошибки, полученные от валидатора и от обработчика ошибок загрузки файлов
    const оbjForUniteErrors = {
      ...result.mapped(),
      ...req.errorObj,
    };
    await req.flash("errors", оbjForUniteErrors);
    await req.flash("body", req.body);
    const backURL = req.header("Referer") || "/";
    res.redirect(backURL);
  } else {
    req.body = matchedData(req);
    next();
  }
};
export const putRequestToContext = (req, res, next) => {
  res.locals.req = req;
  next();
};

export function extendFlashAPI(req, _, next) {
  req.getFlash = async function (name) {
    const d = await this.consumeFlash(name);
    return d.length > 0 ? d[0] : undefined;
  };
  next();
}

export async function getErrors(req, res, next) {
  res.locals.errors = (await req.getFlash("errors")) || {};
  res.locals.body = (await req.getFlash("body")) || {};
  next();
}

export const loadCurrentUser = (req, _, next) => {
  req.user = req.session.user;
  next();
};

export const isGuest = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

export function isLoggedIn(req, res, next) {
  if (req.user) next();
  else res.redirect("/login");
}
