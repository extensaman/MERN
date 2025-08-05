import { matchedData, validationResult } from "express-validator";

export const handleErrors = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    await req.flash("errors", result.mapped());
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
