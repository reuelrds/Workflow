const getDepartment = require('./department.get.controller');
const postDepartment = require('./department.post.controller');
const patchDepartment = require('./department.patch.controller');


/**
 * Export Different methods for handling various routes
 * wrapped in one single object
 */
module.exports = {
  getDepartment,
  postDepartment,
  patchDepartment
};
