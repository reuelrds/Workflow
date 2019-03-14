const express = require('express');
const router = express.Router();
const multer = require('multer');

const AuthController = require('./../controllers/auth.controller');
const {avatar} = require('./../config/multer.config');


router.post("/user-signup", multer({storage: avatar}).single('img'), AuthController.createUser);
router.post("/admin-signup", AuthController.createAdmin);

router.post("/login", AuthController.loginUser);


module.exports = router;