const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const {
  getGroup, 
  postGroup,
  patchGroup } = require('./../controllers/group.controller');

/**
 * Providing Route Handlers for the group route
 */
router.post('/new-group', CheckAuth, postGroup.addGroup);

router.patch(
  '/:groupId/updateGroupName',
  CheckAuth,
  patchGroup.updateGroupName
);

router.get(
  '/all-groups',
  CheckAuth,
  getGroup.getAllGroups
);

router.get(
  '/:groupId',
  CheckAuth,
  getGroup.getGroupData
)


module.exports = router;