const mongoose = require('mongoose');
const uniqueVlaidator = require('mongoose-unique-validator');

/**
 * Schema Defination for Location Collection
 * Fields:
 *  id: A unique id generated for a location
 *  locationName: A unique string identifying a location
 *  locationHead: A unique id of a location's Head
 */
const locationSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  locationName: {
    type: String,
    required: true,
    unique: true
  },
  locationHead: {
    type: String,
    ref: 'User',
    unique: true
  }
});

/**
 * The uniqueVlaidator enforces uniqueness constraint
 */
locationSchema.plugin(uniqueVlaidator);

/**
 * Remoce _id & __v from the query result
 */
locationSchema.methods.toJSON = function () {
  const location = this
  const locationObject = location.toObject()

  delete locationObject._id
  delete locationObject.__v

  return locationObject
}

/**
 * A Field that will get populated with an array of users.
 */
locationSchema.virtual('staff', {
  ref: 'User',
  localField: 'id',
  foreignField: 'locationId'
});

module.exports = mongoose.model('Location', locationSchema);

