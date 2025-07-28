import express from "express";
import { config } from "dotenv";
import "./source/models/__loaddatabase.js";
import router from "./source/router.js";

config();
const port = process.env.PORT || 5000;

const app = express();
app.locals.appTitle = process.env.APPTITLE || "Express";

app.set("view engine", "ejs");
app.set("views", "./source/templates");

app.use("/", router);
const server = app.listen(port, () =>
  console.log(`Server started at port ${port}`)
);
console.log(server.address());
