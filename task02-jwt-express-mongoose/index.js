const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const secret = "secret";

const errorHandler = (err, _, res, __) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ message: err });
  } else {
    res.status(500).send({ error: err });
  }
  console.error(err);
};

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
    });

    const User = new mongoose.model("User", userSchema);

    app.use(express.json());
    app.use(cors());
    app.use(errorHandler);

    app.get("/", (_, res) => {
      res.send({ message: "Main page" });
    });

    app.post("/", (request, response) => {
      if (request.body && request.body.token) {
        console.log(request.body.token);
        jwt.verify(request.body.token, secret, (err, payload) => {
          if (err) {
            response
              .status(401)
              .send({ message: "Unauthorized Access. Bad token", error: err });
            return;
          }
          if (payload) {
            response
              .status(200)
              .send({ message: "ATHORIZED DATA", data: "DATA IS HERE" });
          }
        })
      } else {
        console.log("No token");
        response
          .status(401)
          .send({ message: "Unauthorized Access. No token" });
      }
    });

    app.post("/signup", (request, response) => {
      console.log(request.body);
      console.log(request.body.email);
      console.log(request.body.password);
      if (request.body && request.body.email && request.body.password) {
        bcrypt
          .hash(request.body.password, 10)
          .then((hash) => {
            const user = new User({
              email: request.body.email,
              password: hash,
            });
            User.create(user)
              .then((result) => response.status(200).send(result))
              .catch((err) => response.status(500).send({ error: err }));
          })
          .catch((err) => response.status(500).send({ error: err }));
      } else {
        response.sendStatus(400);
      }
    });

    app.post("/signin", (request, response) => {
      if (request.body && request.body.email && request.body.password) {
        User.findOne({ email: request.body.email })
          .then((user) => {
            if (user) {
              bcrypt
                .compare(request.body.password, user.password)
                .then((result) => {
                  if (result) {
                    const token = jwt.sign(
                      { user: user.email, _id: user._id },
                      secret,
                      { expiresIn: "1h" }
                    );
                    response
                      .status(200)
                      .send({ message: "You are welcome!", token: token });
                  } else {
                    response
                      .status(401)
                      .send({ message: "Unauthorized Access. Wrong password" });
                  }
                });
            } else {
              response
                .status(401)
                .send({ message: "Unauthorized Access. Wrong username" });
            }
          })
          .catch((err) => {
            response.status(500).send({ error: err });
            console.error(err);
          });
      } else {
        response.sendStatus(400);
      }
    });

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch((err) => console.error(err));
