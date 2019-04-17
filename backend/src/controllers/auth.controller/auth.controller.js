// Importing Required Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqid = require('uniqid');

const User = require("./../../models/user.model");
const Admin = require("../../models/admin.model");
const config = require("../../config/var.config");

// Creating user
exports.createUser = async (req, res, next) => {
  console.log(req.body);
  

  try {

    // Hashing password
    const hashedPasswd = await bcrypt.hash(req.body.password, config.bcrypt.saltLength);

    // baseUrl for image
    const url = req.protocol + "://" +req.get("host");
    
    // Creating user object to be saved into the database
    let imgpath;
    if(!req.file) {
      imgpath = "null";
    } else {
      imgpath = req.file.filename;
    }

    let userData = {
      profileImagePath: url+ config.uploadsFolder.slice(-14) + '/avatars/' + imgpath,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPasswd,
      id: uniqid()
    };

    if(req.body.token) {

      // fetching admin for the user
      const admin = await Admin.findOne({id: req.body.token});
      
      if(!admin) {
        throw new Error("The Admin Account for your Organization doesn't exist. Please create one Before registering any users");
      } else {
        console.log(admin);
        userData = {
          ...userData,
          companyId: admin.id
        };
      }
    }

    const newUser = new User(userData);


    // Saving admin credentials to the database
    const result = await newUser.save();

    const jwtToken = jwt.sign({
      email: req.body.email,
      userId: result.id
    }, config.jwtsecret, {
      expiresIn: "24h"
    });

    // Saving successfull
    res.status(201).json({
      message: "User Created!",
      jwtToken,
      usertype: 'User',
      expiresIn: 86400,
      userId: result.id
    });     
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Creating User Failed!'
    });
  }
};

// Creating admin
exports.createAdmin = async (req, res, next) => {
  // console.log(req.body);
  try {

    // Hashing Password
    const hashedPasswd = await bcrypt.hash(req.body.password, config.bcrypt.saltLength);

    // Creating Admin object to be saved into the database
    const admin = new Admin({
      name: req.body.companyName,
      email: req.body.email,
      password: hashedPasswd,
      id: uniqid()
    });

    // Saving admin credentials to the database
    const result = await admin.save();

    // console.log("vervebeb", result);
    const jwtToken = jwt.sign({
      email: req.body.email,
      userId: result.id
    }, config.jwtsecret, {
      expiresIn: "24h"
    });

    // Saving successfull
    res.status(201).json({
      message: "User Created!",
      jwtToken,
      usertype: 'Admin',
      expiresIn: 86400,
      userId: result.id
    });

  } catch(error) {

    // console.log(error);
    res.status(500).json({
      message: `Creating Admin Failed! ${error.message}`
    });

  }
};

// Logging in user
exports.loginUser = async (req, res, next) => {
  console.log(req.body);
  
  try {

    let fetchedUser;
    let isAdmin = false;

    // Trying to fetch from admin collection
    fetchedUser = await Admin.findOne({email: req.body.email});
    if (!fetchedUser) {

      // user isn't in the admin collection. Trying in User colllection
      fetchedUser = await User.findOne({email: req.body.email});

      // no user with credentials found
      if (!fetchedUser) {
        throw new Error("Login Credientials do not exist. Please register before logging in.");
      }
    } else {

      // found user in admin collection
      isAdmin = true;
    }

    // Comparing passwords of fetched user vs supploid one
    const result = await bcrypt.compare(req.body.password, fetchedUser.password);
    if(result){

      // as all the credentials match, create a jwt and sent back to client
      const jwtToken = jwt.sign({
          email: fetchedUser.email,
          userId: fetchedUser.id
      }, config.jwtsecret, {
          expiresIn: "24h"
      });

      res.status(200).json({
        jwtToken,
        usertype: isAdmin ? 'Admin': 'User',
        expiresIn: 86400,
        userId: fetchedUser.id
      });
    } else {
      // The passwords aren't matching
      throw new Error("Login Credientials do not exist. Passwords don't match. Please register before logging in.");
    }
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      message: `Login Failed! ${error.message}`
    });
  }

};
