/*
    Define Sequelized Credit Entity
*/

module.exports = (sequelize, Sequelize) => {
  const Credit = sequelize.define(
    "credits",
    {
      credits_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "credits_id",
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "date",
      },
      charged_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "charged_amount",
      },
      old_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "old_amount",
      },
      new_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "new_amount",
      },
    },
    {
      tableName: "credits",
      timestamps: false, //to not add createdAt & updatedAt per default
      freezeTableName: true, //stop auto-pluralization
    }
  );

  return Credit;
};
