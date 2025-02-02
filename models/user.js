const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  photo: { type: String },
  phone: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, trim: true },
  education: { type: String, required: true, trim: true },
});

// hash password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next(); // only hash the password if it has been modified (or is new)
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// check whether password matches with the one in the db
userSchema.methods.passwordMatch = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  delete this.toObject().password;
  return isMatch;
};

// remove password from http response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
