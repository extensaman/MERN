import { Router } from "express";
import { urlencoded } from "express";
import { detailPage, mainPage } from "./controllers/todos.js";

const router = Router();

router.use(urlencoded({ extended: true })); // чтобы была возможность принимать POST-запросы (по дефолту только GET-запросы принимаются)
router.get("/", mainPage);
router.get("/:id", detailPage);

export default router;
