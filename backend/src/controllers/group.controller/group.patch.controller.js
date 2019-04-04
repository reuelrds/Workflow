const Admin = require("../../models/admin.model");
const Group = require('../../models/group.model');


/**
 * Updates a group's Name
 */
exports.updateGroupName = async (req, res, next) => {
  try {
    
    /**
     * Check if the Admin exists. 
     * This check is redundant as CheckAuth indirectly verifies Admin.
     * But on a safer side if Admin is accidently deleted 
     * after the client side recieves the token 
     * this will throw an error while CheckAuth won't.
     */
    const admin = await Admin.findOne({id: req.userData.userId});
    if (!admin) {
      throw new Error("Admin Not Found. Invalid Request");
    }

    /**
     * Find the group that will be updated
     */
    let group = await Group.findOne({id: req.params.groupId});  
    if(!group) {
      throw new Error('Group Not Found. Invalid Request');
    }

    // Update the group Name and Save
    group.groupName = req.body.newGroupName;
    await group.save();

    // Return the group object with updated Name+
    res.status(200).json({
      message: "Updated Group Name",
      group
    });
  } catch (error) {

    // Catches any errors that occur and sends the error message back to client
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}