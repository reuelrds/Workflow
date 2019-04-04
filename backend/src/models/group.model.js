const mongoose = require('mongoose');
const uniqueVlaidator = require('mongoose-unique-validator');

/**
 * Schema Defination for Group Collection
 * Fields:
 *  id: A unique id generated for a group
 *  groupName: A unique string identifying a group
 */
const groupSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  groupName: {
    type: String,
    required: true,
    unique: true
  }
});

/**
 * The uniqueVlaidator enforces uniqueness constraintf
 */
groupSchema.plugin(uniqueVlaidator);

/**
 * Remoce _id & __v from the query result
 */
groupSchema.methods.toJSON = function () {
  const group = this
  const groupObject = group.toObject()

  delete groupObject._id
  delete groupObject.__v

  return groupObject
}

/**
 * A Field that will get populated with an array of users.
 */
groupSchema.virtual('staff', {
  ref: 'User',
  localField: 'id',
  foreignField: 'groupId'
});

module.exports = mongoose.model('Group', groupSchema);

