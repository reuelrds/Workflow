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
    await admin.populate('users', 'id firstName lastName email isManager').execPopulate();

    let users = admin.users;

    console.log(typeof(admin.users));
    users = users.map(user => {
      user = user.toObject();
      delete user._id;
      delete user.companyId;
      console.log(user);
      return user;
    });

    console.log(users)
    res.status(200).json({
      users
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "No Users Found"
    })
  }
}

// module.exports = (
//   getUserData,
//   getAllUsers
// );