const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();

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
    app.use(errorHandler);

    app.get("/", (_, res) => {
      res.send({ message: "Main page" });
    });

    app.post("/signin", (request, response) => {
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

    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch((err) => console.error(err));
