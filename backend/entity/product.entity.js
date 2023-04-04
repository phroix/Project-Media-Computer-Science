/*
    Define Sequelized Product Entity
*/

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "products",
    {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "product_id",
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: "name",
      },
      costs: {
        type: Sequelize.FLOAT,
        allowNull: true,
        field: "costs",
      },
    },
    {
      tableName: "products",
      timestamps: false, //to not add createdAt & updatedAt per default
      freezeTableName: true, //stop auto-pluralization
    }
  );

  return Product;
};
