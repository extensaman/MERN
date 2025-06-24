const Model = require("./model");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodeMailer = require("nodemailer");
const Constants = require("./constants");
const Helper = require("./misc/helper");

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

const responseDBError = (response, error) => {
  response.status(500).send({ message: "Database error", error: error });
};

const mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "XXX",
    pass: "XXX",
  },
});

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
        if (
          auth &&
          auth.dataValues &&
          auth.dataValues.tabelNumber &&
          auth.dataValues.id
        ) {
          bcrypt
            .compare(request.body.password, auth.dataValues.password)
            .then((result) => {
              if (result) {
                const token = jwt.sign(
                  { user: auth.dataValues.tabelNumber, id: auth.dataValues.id },
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
      .catch((err) => responseDBError(response, err));
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
        if (auth.dataValues) {
          console.log(
            "Найдены данные для аутентификации со следующей почтой: " +
              auth.dataValues.email
          );
          // генерируем случайное четырехзначное число (максимум не включается, минимум включается)
          const code = Math.floor(
            Math.random() * (Constants.CODE_MAX - Constants.CODE_MIN) +
              Constants.CODE_MIN
          );
          // обновляем в БД поле "code" для соответствующего табельнго номера
          Model.Auth.update(
            { code: code },
            { where: { tabelNumber: request.body.tabelNumber } }
          )
            .then(() => {
              if (auth.dataValues.email) {
                // Отправляем на почту сгенерированный код
                mailTransporter
                  .sendMail({
                    from: 'Личный кабинет сотрудника филиала "Минские тепловые сети" ',
                    to: auth.dataValues.email,
                    subject: "Код активации учетной записи",
                    html: `<div style="font-size: 12px;">Код активации учетной записи: <strong style="font-size: 14px;">${code}</strong></div>`,
                  })
                  .then((result) => {
                    console.log(result);
                    response.status(200).send({
                      message: "Activation code has sent",
                      result: Helper.hidePartOfEmail(auth.dataValues.email),
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    response
                      .status(500)
                      .send({ message: "Error in mail transport", error: err });
                  });
              } else {
                // если в БД поле с почтой пустое, то отвечаем, что у данного пользователя нет почты
                response
                  .status(400)
                  .send({ message: "This user hasn't email" });
              }
            })
            .catch((err) => responseDBError(response, err));
        } else {
          response
            .status(401)
            .send({ message: "Unauthorized Access. Wrong tabel number" });
        }
      })
      .catch((err) => responseDBError(response, err));
  } else {
    response.sendStatus(400);
  }
});

app.listen(Constants.PORT, () =>
  console.log(`Server started at port ${Constants.PORT}`)
);
