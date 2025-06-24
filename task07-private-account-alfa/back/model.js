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
  tabelNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Auth = sequelize.define("auth", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  tabelNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  code: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

// sequelize
//   .sync({ force: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

// Auth.create({
//   tabelNumber: 11075,
//   email: "yusikov_av@mts.minskenergo.by",
// });

module.exports = {
  User: User,
  Auth: Auth,
};
