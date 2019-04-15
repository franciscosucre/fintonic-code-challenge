const jwt = require("jsonwebtoken");

const signToken = user => new Promise(resolve => resolve(jwt.sign(user, process.env.JWT_SECRET)));

const decodeToken = token => new Promise(resolve => resolve(jwt.verify(token, process.env.JWT_SECRET)));

module.exports = {
  signToken,
  decodeToken
};
