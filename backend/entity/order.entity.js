/*
    Define Sequelized Order Entity
*/

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "orders",
    {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "order_id",
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "date",
      },
    },
    {
      tableName: "orders",
      timestamps: false, //to not add createdAt & updatedAt per default
      freezeTableName: true, //stop auto-pluralization
    }
  );

  return Order;
};
