const express = require('express');
const router = express.Router();
const multer = require('multer');

const {auth} = require('./../controllers/auth.controller');
const {avatar} = require('./../config/multer.config');


router.post("/user-signup", multer({storage: avatar}).single('img'), auth.createUser);
router.post("/admin-signup", auth.createAdmin);

router.post("/login", auth.loginUser);


module.exports = router;