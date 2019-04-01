const mongoose = require('mongoose');
const uniqueVlaidator = require('mongoose-unique-validator');

/**
 * Schema Defination for Department Collection
 * Fields:
 *  id: A unique id generated for a Department
 *  name: A unique string identifying a Department
 *  departmentHead: A unique id of a Department's Head
 */
const departmentSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  departmentName: {
    type: String,
    required: true,
    unique: true
  },
  departmentHead: {
    type: String,
    ref: 'User',
    unique: true
  }
});

/**
 * The uniqueVlaidator enforces uniqueness constraint
 */
departmentSchema.plugin(uniqueVlaidator);

/**
 * Remoce _id & __v from the query result
 */
departmentSchema.methods.toJSON = function () {
  const department = this
  const departmentObject = department.toObject()

  delete departmentObject._id
  delete departmentObject.__v

  return departmentObject
}

/**
 * A Field that will get populated with an array of users.
 */
departmentSchema.virtual('staff', {
  ref: 'User',
  localField: 'id',
  foreignField: 'departmentId'
});

module.exports = mongoose.model('Department', departmentSchema);

