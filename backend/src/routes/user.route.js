const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const UserController = require('./../controllers/user.controller');

router.get('/:id', UserController.getUserData);

router.post('/add-new-user', CheckAuth, UserController.addUser);


module.exports = router;