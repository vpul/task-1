const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  try {
    if (req.cookie) {
      const payload = jwt.verify(
        req.cookie.accessToken,
        process.env.JWT_SECRET,
      );
      res.locals = payload;
      return next();
    }
    return next(createError(401, 'Access token is required'));
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      err.status = 401;
    }
    return next(err);
  }
};
