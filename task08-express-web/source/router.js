import { Router } from "express";
import { urlencoded } from "express";
import methodOverride from "method-override";
import { logger } from "./utility.js";
import {
  detailPage,
  mainPage,
  addItem,
  add,
  setDone,
  remove,
} from "./controllers/todos.js";

const router = Router();

router.use(urlencoded({ extended: true })); // чтобы была возможность принимать POST-запросы (по дефолту только GET-запросы принимаются)
router.use(methodOverride("_method")); // для возможности использования запросов PUT и DELETE в формах, т.к. по дефолту формы могут посылать только GET и POST запросы
router.use(logger);
router.get("/add", addItem);
router.get("/:id", detailPage);
router.get("/", mainPage);
router.post("/add", add);
router.put("/:id", setDone);
router.delete("/:id", remove);

export default router;
