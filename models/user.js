const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  photo: { type: String },
  contactNumber: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  gender: { type: String, required: true, trim: true },
  education: { type: String, required: true, trim: true },
});

module.exports = mongoose.model('User', userSchema);
