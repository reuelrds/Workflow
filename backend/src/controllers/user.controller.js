const uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

const config = require('./../config/var.config');
const Admin = require("./../models/admin.model");
const User = require("./../models/user.model");

const getUserData = async (req, res, next) => {
  try {

    const UserData = await User.findOne({id: req.params.id});
    console.log(UserData);
    res.status(200).json({
      firstName: UserData.firstName,
      lastName: UserData.lastName,
      email: UserData.email
    });
    
  } catch (error) {
    res.status(404).json({
      message: "User Data Not Found"
    })
  }
}

const addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const admin = await Admin.findOne({id: req.userData.userId});
    
    if(!admin) {
      throw new Error('Invalid Request');
    }

    const id = uniqid()
    const hashedPassword = await bcrypt.hash(id, config.bcrypt.saltLength);

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      id:id
    };

    const result = await User(newUser).save()
    console.log(result);

    res.status(201).json({
      message: "Added User",
      user: {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        id: result.id
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Not Found"
    })
  }
}

module.exports = {
  getUserData,
  addUser
};
