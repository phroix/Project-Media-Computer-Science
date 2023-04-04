/*
    Routes for User Methods
*/
const router = require("express").Router();
const authJwt = require("../middleware/authJwt");

var userController = require("../controllers/user.controller");

module.exports = (app) => {
  //accepts custom headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST, create user and save in db
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.is_admin],
    userController.createUser
  );

  //GET, find users by username
  router.get(
    "/",
    [authJwt.verifyToken, authJwt.is_admin],
    userController.getUserByUsername
  );

  //GET, users List
  router.get(
    "/list",
    [authJwt.verifyToken, authJwt.is_admin],
    userController.getUsersList
  );

  //GET, get user credit by ID
  router.get("/:user_id", [authJwt.verifyToken], userController.getUserById);

  //PUT, update a user with user_id
  router.put("/:user_id", [authJwt.verifyToken], userController.updateUser);

  //PUT, update a user with user_id redit
  router.put(
    "/credit/:user_id",
    [authJwt.verifyToken],
    userController.updateUserCredit
  );

  //DELETE, delete a user with user_id
  router.delete(
    "/:user_id",
    [authJwt.verifyToken, authJwt.is_admin],
    userController.deleteUser
  );

  app.use("/users", router);
};
