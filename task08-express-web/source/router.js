import { Router } from "express";
import { urlencoded } from "express";
import methodOverride from "method-override";
import { logger } from "./utility.js";
import { putRequestToContext, handleErrors } from "./middleware.js";
import { todoV } from "./validators.js";
import cookieParser from "cookie-parser";
import {
  detailPage,
  mainPage,
  addItem,
  add,
  setDone,
  remove,
  setOrder,
} from "./controllers/todos.js";
import { error500Handler, mainErrorHandler } from "./error-handlers.js";

const router = Router();

router.use(urlencoded({ extended: true })); // чтобы была возможность принимать POST-запросы (по дефолту только GET-запросы принимаются)
router.use(methodOverride("_method")); // для возможности использования запросов PUT и DELETE в формах, т.к. по дефолту формы могут посылать только GET и POST запросы
router.use(cookieParser());
router.use(logger);
router.use(putRequestToContext);
router.get("/add", addItem);
router.get("/:id", detailPage);
router.get("/", mainPage);
router.post("/add", todoV, handleErrors, add);
router.post("/setorder", setOrder);
router.put("/:id", setDone);
router.delete("/:id", remove);
router.use(mainErrorHandler, error500Handler); // ДОЛЖЕН БЫТЬ ПОСЛЕДНИМ, а иначе срабатывает встроенный в express обработчик ошибок

export default router;
