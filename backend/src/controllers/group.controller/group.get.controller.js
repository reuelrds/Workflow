const Admin = require("../../models/admin.model");
const Group = require('../../models/group.model');


/**
 * Retrieves a Group Data
 */
exports.getGroupData = async (req, res, next) => {
  try {

    // Sanity Check
    const admin = await Admin.findOne({id: req.userData.userId});
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    // Try to query a group based on given id
    const groupData = await Group.findOne({id: req.params.groupId});
    console.log(groupData);
    if(!groupData) {
      throw new Error("Group Data Not Found");
    }

    // Send the response back
    res.status(200).json({
      group: groupData
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}

/**
 * Get a list containing all groups
 */
exports.getAllGroups = async (req, res, next) => {
  try {
    
    // Sanity Check
    console.log("feggg");
    const admin = await Admin.findOne({id: req.userData.userId});
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    // find all groups and return the result back to client
    const groups = await Group.find();
    res.status(200).json({
      groups 
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}
