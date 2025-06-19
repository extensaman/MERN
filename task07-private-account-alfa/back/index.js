const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "root", "iiyama102", {
  dialect: "mysql",
  host: "localhost",
});
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// sequelize
//   .sync()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

User.create({
  name: "Tom",
  age: 35,
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
