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

    const managerId = req.body.managerId
      ? req.body.managerId
      : user.managerId;

    const prevManagerId = user.managerId;

    user.managerId = req.body.managerId;
    await user.save();
    const userPrev = user;
    
    user = await User.findOne({id: req.params.id});
    if (!user.managerId && req.body.managerId) {
      throw new Error('User not updated');
    }

    let prevManager;
    if(prevManagerId) {
      user = await User.findOne({id: prevManagerId});
      await user.populate({
        path: 'staff'
      }).execPopulate();
      
      user.isManager = user.staff.length === 0
      ? false
      : true;
      await user.save();
      prevManager = user;
    }
    
    user = await User.findOne({id: managerId});
    await user.populate({
      path: 'staff'
    }).execPopulate();

    user.isManager = user.staff.length === 0
      ? false
      : true;
    await user.save();

    res.status(200).json({
      message: "Successfully Updated User's new Manager",
      user: userPrev,
      manager: user,
      prevManager
    });


  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

/**
 * Update User's Department
 */
exports.updateDepartment = async (req, res, next) => {
  try {
    
    // Sanity Check whether the admin actually exists
    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }

    // Find if the user exists and belongs to the authenticated admin's organization
    let user = await User.findOne({id: req.params.id});  
    if(!user || user.companyId !== admin.id) {
      throw new Error('User Not Found. Invalid Request');
    }

    // Update User's department
    user.departmentId = req.body.departmentId;
    await user.save();


    // Sanity check whether the users department was sucessfully changed
    const userPrev = user;
    user = await User.findOne({id: req.params.id});
    if (!user.departmentId && req.body.departmentId) {
      throw new Error('User\'s Department not updated');
    }

    // Send the response back to client
    res.status(200).json({
      message: "Successfully Updated User's Department",
      user: userPrev
    });


  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

/**
 * Update User's Office location
 */
exports.updateLocation = async (req, res, next) => {
  try {
    
    // Sanity Check whether the admin actually exists
    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }

    // Find if the user exists and belongs to the authenticated admin's organization
    let user = await User.findOne({id: req.params.id});  
    if(!user || user.companyId !== admin.id) {
      throw new Error('User Not Found. Invalid Request');
    }

    // Update User's Location
    user.locationId = req.body.locationId;
    await user.save();


    // Sanity check whether the users department was sucessfully changed
    const userPrev = user;
    user = await User.findOne({id: req.params.id});
    if (!user.locationId && req.body.locationId) {
      throw new Error('User\'s Location not updated');
    }

    // Send the response back to client
    res.status(200).json({
      message: "Successfully Updated User's Location",
      user: userPrev
    });


  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

/**
 * Update User's Group
 */
exports.updateGroup = async (req, res, next) => {
  try {
    
    // Sanity Check whether the admin actually exists
    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }

    // Find if the user exists and belongs to the authenticated admin's organization
    let user = await User.findOne({id: req.params.id});  
    if(!user || user.companyId !== admin.id) {
      throw new Error('User Not Found. Invalid Request');
    }

    // Update User's group
    user.groupId = req.body.groupId;
    await user.save();


    // Sanity check whether the users department was sucessfully changed
    const userPrev = user;
    user = await User.findOne({id: req.params.id});
    if (!user.groupId && req.body.groupId) {
      throw new Error('User\'s Group not updated');
    }

    // Send the response back to client
    res.status(200).json({
      message: "Successfully Updated User's Group",
      user: userPrev
    });


  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}