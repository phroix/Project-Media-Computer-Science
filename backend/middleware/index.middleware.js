/*
  -middleware stores object with token and admin role
*/

const authJwt = require("./authJwt");

//Json Web token
module.exports = {
  authJwt,
};
