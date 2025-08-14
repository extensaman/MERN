import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pbkdf2 } from "node:crypto";
import { promisify } from "node:util";

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

export const pbkdf2Promisified = promisify(pbkdf2);
