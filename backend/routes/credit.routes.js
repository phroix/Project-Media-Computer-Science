/*
    Routes for Credit Methods
*/

// const express = require('express');
const router = require("express").Router();
const authJwt = require("../middleware/authJwt");

var creditController = require("../controllers/credit.controller");

module.exports = (app) => {
  // accepts custom headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //GET, find order by month
  router.get(
    "/:user_id",
    [authJwt.verifyToken],
    creditController.getCreditByDate
  );

  app.use("/credits", router);
};
