const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const {getUsers, postUsers, patchUsers} = require('./../controllers/user.controller');

// console.log("ggr", UserController);

router.get('/all-users', CheckAuth, getUsers.getAllUsers);
router.get('/managers', CheckAuth, getUsers.getManagers);
router.get('/:id', CheckAuth, getUsers.getUserData);

router.post('/add-new-user', CheckAuth, postUsers.addUser);
router.post('/add-new-manager', CheckAuth, postUsers.addManager);

router.patch('/update-manager/:id', CheckAuth, patchUsers.updateManager)


module.exports = router;