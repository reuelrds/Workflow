const getGroup = require('./group.get.controller');
const postGroup = require('./group.post.controller');
const patchGroup = require('./group.patch.controller');


/**
 * Export Different methods for handling various routes
 * wrapped in one single object
 */
module.exports = {
  getGroup,
  postGroup,
  patchGroup
};
