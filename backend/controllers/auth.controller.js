/*
    login:
    -find username of the request in database, if it exists
    -compare password with password in database using bcrypt, if it is correct
    -generate a token using jsonwebtoken
    -return user information & access Token
*/

const db = require("../entity/index.entity");
const authConfig = require("../config/auth.config");
const UserEntity = db.users;
const { spawn } = require("child_process");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//POST, login user with username & password
exports.login = (req, res) => {
  //find user by username
  UserEntity.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    //if user with username does not exist
    if (!user) {
      return res.status(404).send({ message: "Invalid Username or Password." });
    }
    //compare given pw with hashed pw from db
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    //if wrong password
    if (!passwordIsValid) {
      return res.status(404).send({
        accessToken: null,
        message: "Invalid Username or Password!",
      });
    }

    //generates token with secrect
    var token = jwt.sign(
      { user_id: user.user_id }, //Payload: What store in JWT, If payload not buffer or string, coerced into string using JSON.stringify
      authConfig.secret, //Key to generate token
      { expiresIn: 86400 }
    ); //[options, callback] toke expires in 24 hours

    res.status(200).send({
      user_id: user.user_id,
      credits: user.credits,
      username: user.username,
      email: user.email,
      accessToken: token,
      is_admin: user.is_admin,
      rfid: user.rfid,
      firstLogin: user.firstLogin,
    });
  });
};

//POST, login user with rfid
exports.loginRFID = (req, res) => {
  //find user by username
  UserEntity.findOne({
    where: {
      rfid: req.body.rfid,
    },
  }).then((user) => {
    //if user with username does not exist
    if (!user) {
      return res.status(404).send({ message: "Invalid RFID." });
    }

    //generates token with secrect
    var token = jwt.sign(
      { user_id: user.user_id }, //Payload: What store in JWT, If payload not buffer or string, coerced into string using JSON.stringify
      authConfig.secret, //Key to generate token
      { expiresIn: 86400 }
    ); //[options, callback] toke expires in 24 hours

    res.status(200).send({
      user_id: user.user_id,
      credits: user.credits,
      username: user.username,
      email: user.email,
      accessToken: token,
      is_admin: user.is_admin,
      rfid: user.rfid,
    });
  });
};
