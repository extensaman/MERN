import express from "express";
import { config } from "dotenv";
import "./source/models/__loaddatabase.js";
import { mainPage } from "./source/controllers/todos.js";

config();
const port = process.env.PORT || 8000;

const app = express();

app.get("/", mainPage);
const server = app.listen(port, () =>
  console.log(`Server started at port ${port}`)
);
console.log(server.address());
