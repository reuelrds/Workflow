const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const { getAdmin } = require('./../controllers/admin.controller');

router.get('/:id', getAdmin.getAdminData);


module.exports = router;