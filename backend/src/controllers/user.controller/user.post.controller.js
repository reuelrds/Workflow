const uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

const config = require('./../../config/var.config');
const Admin = require("./../../models/admin.model");
const User = require("./../../models/user.model");



exports.addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const admin = await Admin.findOne({id: req.userData.userId});
    
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    const id = uniqid()
    const hashedPassword = await bcrypt.hash(id, config.bcrypt.saltLength);

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      id:id,
      companyId: req.userData.userId
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
      message: error.message
    })
  }
}

exports.addManager = async (req, res, next) => {

  try {

    const admin = await Admin.findOne({id: req.userData.userId});
    
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    let user = await User.findOne({id: req.body.id});
      
    if(!user || user.companyId !== admin.id) {
      throw new Error('User Not Found. Invalid Request');
    }
  
    user.isManager = true;
    await user.save();

    user = await User.findOne({id: req.body.id});
    if (!user.isManager) {
      throw new Error('User not updated to Manager');
    }
  
    res.status(200).json({
      message: "Successfully added new Manager"
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  } 
}
