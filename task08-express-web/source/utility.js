import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

console.log("import.meta.url = " + import.meta.url);
console.log(
  "fileURLToPath(import.meta.url) = " + fileURLToPath(import.meta.url)
);
console.log(
  "dirname(fileURLToPath(import.meta.url)) = " +
    dirname(fileURLToPath(import.meta.url))
);
console.log(
  "dirname(dirname(fileURLToPath(import.meta.url))) = " +
    dirname(dirname(fileURLToPath(import.meta.url)))
);
export const currentDir = dirname(dirname(fileURLToPath(import.meta.url)));

export const logger = (req, res, next) => {
  next();
  console.log(`${req.url} ${res.statusCode} ${res.statusMessage}`);
};
