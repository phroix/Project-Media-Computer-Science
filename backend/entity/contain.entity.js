/*
    Define Sequelized Contains Entity
*/

module.exports = (sequelize, Sequelize) => {
  const Contains = sequelize.define(
    "contains",
    {
      contain_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "contain_id",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "quantity",
      },
      product_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: "product_name",
      },
      product_costs: {
        type: Sequelize.FLOAT,
        allowNull: true,
        field: "product_costs",
      },
    },
    {
      tableName: "contains",
      timestamps: false, //to not add createdAt & updatedAt per default
      freezeTableName: true, //stop auto-pluralization
    }
  );

  return Contains;
};
