import { Router } from "express";
import { detailPage, mainPage } from "./controllers/todos.js";

const router = Router();
router.get("/", mainPage);
router.get("/:id", detailPage);

export default router;
