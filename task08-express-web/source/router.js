import { Router } from "express";
import { urlencoded } from "express";
import methodOverride from "method-override";
import { logger } from "./utility.js";
import {
  putRequestToContext,
  handleErrors,
  extendFlashAPI,
  getErrors,
} from "./middleware.js";
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
import session from "express-session";
import _FileStore from "session-file-store";
import { flash } from "express-flash-message";

const router = Router();
const FileStrore = _FileStore(session);

router.use(urlencoded({ extended: true })); // чтобы была возможность принимать POST-запросы (по дефолту только GET-запросы принимаются)
router.use(methodOverride("_method")); // для возможности использования запросов PUT и DELETE в формах, т.к. по дефолту формы могут посылать только GET и POST запросы
router.use(cookieParser());
router.use(
  // привяка посредника, обрабатывающего сессии
  session({
    // определение места хранения сессий (файловое хранилище)
    store: new FileStrore({
      path: "./storage/sessions",
      reapAsync: true,
      reapSyncFallback: true,
      fallbackSessionFn: () => {
        return {};
      },
      logFn: () => {},
    }),
    secret: "abcdefgh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
// привяка посредника, который с использованием привязанного выше посредника , обрабатывающего сессии, будет обрабатывать всплывающие сообщения
router.use(flash({ sessionKeyName: "flash-message" }));
router.use(extendFlashAPI);
router.use(logger);
router.use(putRequestToContext);
router.get("/add", getErrors, addItem);
router.get("/:id", detailPage);
router.get("/", mainPage);
router.post("/add", todoV, handleErrors, add);
router.post("/setorder", setOrder);
router.put("/:id", setDone);
router.delete("/:id", remove);
router.use(mainErrorHandler, error500Handler); // ДОЛЖЕН БЫТЬ ПОСЛЕДНИМ, а иначе срабатывает встроенный в express обработчик ошибок

export default router;
