/*
    Auth routes for login
*/
const router = require("express").Router();
const authController = require("../controllers/auth.controller");

module.exports = function (app) {
  //accepts custom headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST, login user with username & password
  router.post("/login", authController.login);

  //POST, login user with rfid
  router.post("/loginRFID", authController.loginRFID);

  app.use("/auth", router);
};
