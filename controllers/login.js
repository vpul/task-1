const createError = require('http-errors');
const User = require('../models/user');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../helpers/tokenGenerator');

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // if user does not exist
    if (!user) {
      return next(createError(400, 'Invalid Email or Password'));
    }

    // if password matched
    if (await user.passwordMatch(req.body.password || '')) {
      const accessToken = generateAccessToken({ userId: user.id });
      const refreshToken = generateRefreshToken({ userId: user.id });

      return res
        .status(200)
        .cookie('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 1000 * 60 * 60,
          secure: process.env.NODE_ENV === 'production',
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === 'production',
        })
        .json({
          success: true,
          payload: user,
        });
    }

    // if user exists password did not match
    return next(createError(400, 'Invalid Email or Password'));
  } catch (err) {
    next(err);
  }
};

module.exports = login;
