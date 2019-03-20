const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const AdminController = require('./../controllers/admin.controller');

router.get('/:id', AdminController.getAdminData);

router.post('/add-new-user', CheckAuth, AdminController.addUser);

module.exports = router;