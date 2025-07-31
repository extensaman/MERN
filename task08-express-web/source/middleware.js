export const putRequestToContext = (req, res, next) => {
  res.locals.req = req;
  next();
};
