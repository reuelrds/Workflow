const mongoose = require('mongoose');
const uniqueVlaidator = require('mongoose-unique-validator');
const uniqid = require('uniqid');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    default: uniqid()
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
    required: true
  },
  password: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueVlaidator);
module.exports = mongoose.model('user', userSchema);

