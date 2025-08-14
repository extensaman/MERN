import { randomBytes } from "node:crypto";
import { pbkdf2Promisified } from "../utility.js";
import { addUser } from "../models/users.js";

export function registerPage(_, res) {
  res.render("register", { title: "Регистрация" });
}
export async function register(req, res) {
  const salt = randomBytes(16);
  const hash = await pbkdf2Promisified(
    req.body.password,
    salt,
    100000,
    32,
    "sha256"
  );
  const user = {
    username: req.body.username,
    password: hash,
    salt: salt,
  };
  addUser(user);
  res.redirect("/login");
}

export function loginPage(req, res) {
  res.render("login", { title: "Вход" });
}

export function login(req, res, next) {
  req.session.regenerate((err) => {
    // ........................... 1
    if (err) next(err);
    else {
      req.session.user = {
        // ................................ 2
        id: req.__user._id,
        name: req.__user.username,
      };
      req.session.save((err) => {
        // ......................... 3
        if (err) next(err);
        else res.redirect("/"); // .......................... 4
      });
    }
  });
}

export function logout(req, res, next) {
  delete req.session.user; // .................................... 5
  req.session.save((err) => {
    // ................................. 6
    if (err) next(err);
    else {
      req.session.regenerate((err) => {
        // ................... 7
        if (err) next(err);
        else res.redirect("/login"); // ..................... 8
      });
    }
  });
}
