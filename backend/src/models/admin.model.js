const mongoose = require('mongoose');
const uniqid = require('uniqid');

const uniqueVlaidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
  name: {
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
  id: {
    type: String,
    default: uniqid()
  }
});

adminSchema.plugin(uniqueVlaidator);
module.exports = mongoose.model('admin', adminSchema);