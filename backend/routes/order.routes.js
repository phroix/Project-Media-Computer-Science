/*
    Routes for Product Methods
*/

// const express = require('express');
const router = require("express").Router();
const authJwt = require("../middleware/authJwt");

var orderController = require("../controllers/order.controller");

module.exports = (app) => {
  // accepts custom headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST, create product and save in db
  router.post("/:user_id", orderController.createOrder);

  //GET, find order by month
  router.get(
    "/:user_id",
    [authJwt.verifyToken],
    orderController.getOrderByDate
  );

  app.use("/orders", router);
};
