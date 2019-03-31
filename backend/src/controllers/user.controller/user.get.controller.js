const config = require('./../../config/var.config');
const Admin = require("./../../models/admin.model");
const User = require("./../../models/user.model");

exports.getUserData = async (req, res, next) => {
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

exports.getAllUsers = async (req, res, next) => {
  try {

    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }
    await admin.populate('users').execPopulate();
    console.log(admin.users);
    let users = admin.users;

    res.status(200).json({
      users
    });
    
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

exports.getManagers = async (req, res, next) => {
  try {

    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }
    await admin.populate({
      path: 'users',
      match: {isManager: true}
    }).execPopulate();


    const managers = admin.users.map(user => {
      user = user.toObject();
      const {isManager, ...newUserDetails} = user;
      return newUserDetails;
    });

    res.status(200).json({
      managers
    });

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

// module.exports = (
//   getUserData,
//   getAllUsers
// );