import { matchedData, validationResult } from "express-validator";

export const handleErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
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
