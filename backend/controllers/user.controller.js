/*
  User Controller
  Requests for User Functions
*/
const db = require("../entity/index.entity");
const UserEntity = db.users;
const CreditEntity = db.credits;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

//POST, create user and save in db
exports.createUser = (req, res) => {
  //create a user
  const user = {
    username: req.body.firstname + "." + req.body.lastname,
    password: bcrypt.hashSync("firstLogin", 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    credits: 0,
    is_admin: req.body.is_admin,
    firstLogin: false,
  };

  var condition = user
    ? {
        firstname: { [Op.eq]: `${user.firstname}` },
        lastname: { [Op.eq]: `${user.lastname}` },
      }
    : null;

  UserEntity.findOne({
    where: condition,
  }).then((data) => {
    if (data) {
      const randomNumb = Math.floor(Math.random() * 500) + 1;
      user.username = user.username + "" + randomNumb;
    }

    //save the created user in database
    UserEntity.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating user.",
        });
      });
  });
};

//GET, get user by username
exports.getUserByUsername = (req, res) => {
  const username = req.query.username;

  //search for user only if conidtion is given
  UserEntity.findAll({
    where: {
      username: { [Op.like]: `%${username}%` },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

//GET, get user credit by ID
exports.getUserById = (req, res) => {
  const user_id = req.params.user_id;

  UserEntity.findOne({ where: { user_id: user_id } })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

//GET, get all users
exports.getUsersList = (req, res) => {
  UserEntity.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

//PUT, update a user with user_id
exports.updateUser = (req, res) => {
  const user_id = req.params.user_id;

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }

  var oldCredit = 0;
  let checkCredit =
    (req.body.credits === 0 || req.body.credits !== 0) && req.body.credits;

  if (checkCredit) {
    UserEntity.findOne({ where: { user_id: user_id } }).then((user) => {
      oldCredit = user.credits;
    });
  }

  UserEntity.update(req.body, {
    where: { user_id: user_id },
  })
    .then((num) => {
      if (num == 1) {
        if (checkCredit) {
          var data = {
            user_id: user_id,
            date: new Date(Date.now()),
            charged_amount: req.body.credits - oldCredit,
            old_amount: oldCredit,
            new_amount: req.body.credits,
          };

          CreditEntity.create(data);
        }
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with user_id=${user_id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with user_id=" + user_id,
      });
    });
};

//PUT, update a user_credit with user_id
exports.updateUserCredit = (req, res) => {
  const user_id = req.params.user_id;

  UserEntity.update(req.body, {
    where: { user_id: user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with user_id=${user_id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with user_id=" + user_id,
      });
    });
};

//DELETE, delete a user with user_id
exports.deleteUser = (req, res) => {
  const user_id = req.params.user_id;

  UserEntity.destroy({
    where: { user_id: user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with user_id=${user_id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with user_id=" + user_id,
      });
    });
};
