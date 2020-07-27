const createError = require('http-errors');
const User = require('../models/user');

const signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(createError(400, 'User with that email already exists'));
    }

    req.body.photo = `uploads/${req.file.filename}`;
    const newUser = await User.create(req.body);
    return res.status(201).json({
      status: 'success',
      payload: newUser,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = signup;
