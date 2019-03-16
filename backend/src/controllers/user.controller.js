const User = require("./../models/user.model");

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