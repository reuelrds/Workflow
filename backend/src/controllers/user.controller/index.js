const getUsers = require('./user.get.controller');
const postUsers = require('./user.post.controller');
const patchUsers = require('./user.patch.controller');

module.exports = {
  getUsers,
  postUsers,
  patchUsers
};
