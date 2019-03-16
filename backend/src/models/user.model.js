const mongoose = require('mongoose');
const uniqueVlaidator = require('mongoose-unique-validator');
const uniqid = require('uniqid');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  profileImagePath: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  companyId: {
    type: String
  }
});

userSchema.plugin(uniqueVlaidator);
module.exports = mongoose.model('user', userSchema);

