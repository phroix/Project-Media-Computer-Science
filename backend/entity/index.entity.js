/*
  Sequelize is a promise-based Node.js ORM tool for MYSQL. Features solid transaction support, relations and more.
  Initialize Sequelize
  Add Entitys to a database Object
*/

const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize"); // import Sequelize

//create Sequelize object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

// create db object with sequelized entitys
const db = {};

db.Sequelize = Sequelize; //for Datatypes and SQL Operations
db.sequelize = sequelize; //created sequelize object

// import entity with (sequelize, Sequelize)
db.users = require("./user.entity")(sequelize, Sequelize);
db.products = require("./product.entity")(sequelize, Sequelize);
db.orders = require("./order.entity")(sequelize, Sequelize);
db.conatins = require("./contain.entity")(sequelize, Sequelize);
db.credits = require("./credit.entity")(sequelize, Sequelize);

//add user_id to orders table
db.users.hasMany(db.orders, {
  foreignKey: "user_id",
  as: "o",
});
db.orders.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "u",
});

//add user_id to orders table
db.users.hasMany(db.credits, {
  foreignKey: "user_id",
  as: "cre",
});
db.credits.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "u",
});

//add order_id and product_id to contains table
db.products.hasMany(db.conatins, {
  foreignKey: "product_id",
  as: "c",
});
db.conatins.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "p",
});
db.orders.hasMany(db.conatins, {
  foreignKey: "order_id",
  as: "c",
});
db.conatins.belongsTo(db.orders, {
  foreignKey: "order_id",
  as: "o",
});
module.exports = db;
