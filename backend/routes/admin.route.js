const express = require('express');
const router = express.Router();

const AdminController = require('./../controllers/admin.controller');

router.get('/:id', AdminController.getAdminData);

module.exports = router;