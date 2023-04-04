/*
    process Authentication & Authorization
    -check if token is provided, legal or not. We get token from x-access-token of HTTP
    use jsonwebtoken's verify() function
*/

var jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../entity/index.entity");
const UserEntity = db.users;

//verify generated Token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]; //token given in header

  //if token not defined
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  //if token defined check if token is valid
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user_id = decoded.user_id; //from logged in user decoded user_id
    next();
  });
};

isAdmin = (req, res, next) => {
  //find user by decoded user_id from token
  UserEntity.findByPk(req.user_id).then((user) => {
    //check if user has Admin Role
    if (user.is_admin == 1) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  });
};

//Object authJwt with verified token and admin role
const authJwt = {
  verifyToken: verifyToken,
  is_admin: isAdmin,
};

module.exports = authJwt;
