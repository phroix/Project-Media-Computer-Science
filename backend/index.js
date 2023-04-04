const express = require("express");
const cors = require("cors"); // data transfers between browsers and servers

//import sequelized db with objects
const db = require("./entity/index.entity.js");

const app = express();
app.use(express.json());
app.use(cors());

var corsOptions = {
  //for example can define host of frontend
  origin: "http://localhost:3000",
};

// provides Express middleware to enable CORS with various options
app.use(cors(corsOptions));

// parse request data content type application/json
app.use(express.json());

// parse request data content type application/x-www-form-rulencoded
app.use(express.urlencoded({ extended: true }));

// simple home route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to backend application." });
  res.sendStatus(200);
});



// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// creates tables if doesn't exist (does nothing if already exists)
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);
require("./routes/credit.routes")(app);

module.exports = app;
