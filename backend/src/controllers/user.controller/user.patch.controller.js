const Admin = require("./../../models/admin.model");
const User = require("./../../models/user.model");

exports.updateManager = async (req, res, next) => {
  try {
    
    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }

    let user = await User.findOne({id: req.params.id});  
    if(!user || user.companyId !== admin.id) {
      throw new Error('User Not Found. Invalid Request');
    }

    user.managerId = req.body.managerId;
    await user.save();
    
    user = await User.findOne({id: req.params.id});
    if (!user.managerId && req.body.managerId) {
      throw new Error('User not updated');
    }
    res.status(200).json({
      message: "Successfully Updated User's new Manager",
      user
    });


  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}