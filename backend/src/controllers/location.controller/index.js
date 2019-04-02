const getLocation = require('./location.get.controller');
const postLocation = require('./location.post.controller');
const patchLocation = require('./location.patch.controller');


/**
 * Export Different methods for handling various routes
 * wrapped in one single object
 */
module.exports = {
  getLocation,
  postLocation,
  patchLocation
};
