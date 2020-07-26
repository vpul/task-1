const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateAccessToken = (payload) =>
  jwt.sign(payload, secret, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, secret, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
