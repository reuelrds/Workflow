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
    await admin.populate('users', 'id firstName lastName email isManager').execPopulate();
    console.log(admin.users);
    let users = admin.users;

    users = users.map(user => {
      user = user.toObject();
      delete user._id;
      delete user.companyId;
      return user;
    });

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
      select: 'id firstName lastName email isManager',
      match: {isManager: true}
    }).execPopulate();


    const managers = admin.users.map(user => {
      user = user.toObject();
      const {_id, companyId, isManager, ...newUserDetails} = user;
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