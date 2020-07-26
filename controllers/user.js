const createError = require('http-errors');
const User = require('../models/user');

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.userId);
    if (user) {
      return res.status(200).json({
        success: true,
        payload: user,
      });
    }

    return next(createError(400, 'User does not exist'));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserProfile,
};
