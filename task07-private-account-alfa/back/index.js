const Model = require("./model");
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
        console.log("Payload = " + payload.user);
        response.status(200).send({
          message: "ATHORIZED DATA",
          user: payload.user,
          _id: payload._id,
        });
      }
    });
  } else {
    console.log("No token");
    response.status(401).send({ message: "Unauthorized Access. No token" });
  }
});

app.post("/signin", (request, response) => {
  if (request.body && request.body.tabelNumber && request.body.password) {
    Model.Auth.findOne({ where: { tabelNumber: request.body.tabelNumber } })
      .then((auth) => {
        if (auth) {
          bcrypt
            .compare(request.body.password, auth.password)
            .then((result) => {
              if (result) {
                const token = jwt.sign(
                  { user: auth.tabelNumber, id: auth.id },
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
            .send({ message: "Unauthorized Access. Wrong tabel number" });
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

app.post("/signup", (request, response) => {
  if (request.body && request.body.tabelNumber) {
    Model.Auth.findOne({
      where: { tabelNumber: request.body.tabelNumber },
    })
      .then((auth) => {
        if (auth) {
          // сгенерировать шестизначное число Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
          // сохранить его в БД
          // отправить на почту этот шестизначный номер
          //
        } else {
          response
            .status(401)
            .send({ message: "Unauthorized Access. Wrong tabel number" });
        }
      })
      .catch((err) =>
        response.status(500).send({ message: "Database error", error: err })
      );
  } else {
    response.sendStatus(400);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
