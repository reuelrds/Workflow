const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/auth.controller');
const extractFile = require('./../config/multer.config');


router.post("/user-signup", extractFile, AuthController.createUser);
router.post("/admin-signup", AuthController.createAdmin);

router.post("/login", AuthController.loginUser);


module.exports = router;