const mongoose = require('mongoose');


const uniqueVlaidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  id: {
    type: String,
    unique: true
  }
});

adminSchema.virtual('users', {
  ref: 'User',
  localField: 'id',
  foreignField: 'companyId'
});

adminSchema.plugin(uniqueVlaidator);
module.exports = mongoose.model('Admin', adminSchema);