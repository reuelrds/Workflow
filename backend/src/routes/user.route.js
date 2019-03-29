const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const {getUsers, postUsers} = require('./../controllers/user.controller');

// console.log("ggr", UserController);

router.get('/all-users', CheckAuth, getUsers.getAllUsers);
router.get('/:id', CheckAuth, getUsers.getUserData);

router.post('/add-new-user', CheckAuth, postUsers.addUser);


module.exports = router;