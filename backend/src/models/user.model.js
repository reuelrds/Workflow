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
    type: String,
    ref: 'Admin'
  },
  managerId: {
    type: String
  },
  isManager: {
    type: Boolean
  }
});

userSchema.plugin(uniqueVlaidator);

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject._id
  delete userObject.__v
  delete userObject.companyId

  return userObject
}

module.exports = mongoose.model('User', userSchema);

