const uniqid = require('uniqid');

const Admin = require("../../models/admin.model");
const Group = require('../../models/group.model');


/**
 * Method to Create a New Group
 */
exports.addGroup = async (req, res, next) => {
  try {
    console.log(req.body);

    /**
     * Check if the Admin exists. 
     * This check is redundant as CheckAuth indirectly verifies Admin.
     * But on a safer side if Admin is accidently deleted 
     * after the client side recieves the token 
     * this will throw an error while CheckAuth won't.
     */
    const admin = await Admin.findOne({id: req.userData.userId});
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    // Create a newgroup Object
    const id = uniqid()
    const newGroup = {
      id,
      groupName: req.body.groupName,
    };

    // Save it to the Database
    const group = await Group(newGroup).save()
    console.log(group);

    // Return it back to client side
    res.status(201).json({
      message: "Added new Group",
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
