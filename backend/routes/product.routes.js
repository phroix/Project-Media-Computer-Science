/*
    Routes for Product Methods
*/

// const express = require('express');
const router = require("express").Router();
const authJwt = require("../middleware/authJwt");

var productController = require("../controllers/product.controller");

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
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.is_admin],
    productController.createProduct
  );

  //GET, find product by name
  router.get(
    "/",
    [authJwt.verifyToken, authJwt.is_admin],
    productController.getProductByName
  );

  //GET, return all product
  router.get("/list", productController.getProductsList);

  //PUT, update a product with product_id
  router.put(
    "/:product_id",
    [authJwt.verifyToken, authJwt.is_admin],
    productController.updateProduct
  );

  //DELETE, delete a product with product_id
  router.delete(
    "/:product_id",
    [authJwt.verifyToken, authJwt.is_admin],
    productController.deleteProduct
  );

  app.use("/products", router);
};
