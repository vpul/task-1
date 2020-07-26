const Joi = require('@hapi/joi');
const createError = require('http-errors');

const validationSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=s]{8,}$/,
    )
    .error(
      new Error(
        'Password should have at least 8 characters with at least 1 uppercase, at least 1 lowercase and at least 1 numeric character.',
      ),
    ),

  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .error(new Error('"confirmPassword" must match with "password"')),

  firstName: Joi.string()
    .min(2)
    .max(40)
    .required()
    .error(new Error('Invalid first name')),

  lastName: Joi.string()
    .min(2)
    .max(40)
    .required()
    .error(new Error('Invalid last name')),

  gender: Joi.string().valid('male', 'female', 'other'),

  education: Joi.string().valid('SEE', 'Bachelors', 'Masters', 'PhD'),

  phone: Joi.string()
    .pattern(/^\+?(?:[0-9] ?-?){6,14}[0-9]$/)
    .required()
    .error(new Error('Invalid phone number')),
});

module.exports = (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(createError(422, error.message));
    }
    return next();
  } catch (err) {
    next(err);
  }
};
