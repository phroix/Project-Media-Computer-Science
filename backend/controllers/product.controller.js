/*
  Product Controller
  Requests for Product Functions
*/
const { where } = require("sequelize");
const db = require("../entity/index.entity");
const ProductEntity = db.products;
const Op = db.Sequelize.Op;

//POST, create product and save in db
exports.createProduct = (req, res) => {
  //create a product
  const product = {
    name: req.body.name,
    costs: req.body.costs,
  };

  ProductEntity.findOne({
    where: { name: product.name },
  }).then((data) => {
    if (data) {
      res.status(400).send({
        message: `Product with ${product.name} already exists.`,
      });
      return;
    }

    ProductEntity.create(product)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while creating product.",
        });
      });
  });
};

//GET, get product by name
exports.getProductByName = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  //search for user only if conidtion is given
  if (condition != null) {
    ProductEntity.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product.",
        });
      });
  } else {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving product.",
    });
  }
};

//GET, return all product
exports.getProductsList = (req, res) => {
  ProductEntity.findAll({
    order: [["product_id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

//PUT, update a product with product_id
exports.updateProduct = (req, res) => {
  const product_id = req.params.product_id;

  ProductEntity.update(req.body, {
    where: { product_id: product_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with product_id=${product_id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with product_id=" + product_id,
      });
    });
};

//DELETE, delete a user with user_id
exports.deleteProduct = (req, res) => {
  const product_id = req.params.product_id;

  ProductEntity.destroy({
    where: { product_id: product_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with product_id=${product_id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with product_id=" + product_id,
      });
    });
};
