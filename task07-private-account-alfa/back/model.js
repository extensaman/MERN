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

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

Auth.create({
  tabelNumber: 11074,
  email: "verus.wedding@gmail.com",
});

module.exports = {
  User: User,
  Password: Auth,
};
