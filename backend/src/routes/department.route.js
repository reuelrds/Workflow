const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const {
  getDepartment, 
  postDepartment,
  patchDepartment } = require('./../controllers/department.controller');

/**
 * Providing Route Handlers for the department route
 */
router.post('/new-department', CheckAuth, postDepartment.addDepartment);

router.patch(
  '/:departmentId/updateDepartmentName',
  CheckAuth,
  patchDepartment.updateDepartmentName
);
router.patch(
  '/:departmentId/updateDepartmentHead',
  CheckAuth,
  patchDepartment.updateDepartmentHead
);

router.get(
  '/:departmentId',
  CheckAuth,
  getDepartment.getDepartmentData
)


module.exports = router;