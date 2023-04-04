/*
    Define Sequelized User Entity
*/

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "user_id",
      },
      username: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: "username",
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: "password",
      },
      rfid: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "rfid",
      },
      credits: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "credits",
      },
      firstname: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: "firstname",
      },
      lastname: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: "lastname",
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        field: "email",
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: "is_admin",
      }
    },
    {
      tableName: "users",
      timestamps: false, //to not add createdAt & updatedAt per default
      freezeTableName: true, //stop auto-pluralization
    }
  );

  return User;
};
