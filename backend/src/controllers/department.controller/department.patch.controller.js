const uniqid = require('uniqid');

const Admin = require("../../models/admin.model");
const User = require("../../models/user.model");
const Department = require('../../models/department.model');


/**
 * Updates a Department's Name
 */
exports.updateDepartmentName = async (req, res, next) => {
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
     * Find the Department that will be updated
     */
    let department = await Department.findOne({id: req.params.departmentId});  
    if(!department) {
      throw new Error('Department Not Found. Invalid Request');
    }

    // Update the Department Name and Save
    department.departmentName = req.body.newDepartmentName;
    await department.save();

    // Return the Department object with updated Name+
    res.status(200).json({
      message: "Updated Department Name",
      department
    });
  } catch (error) {

    // Catches any errors that occur and sends the error message back to client
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}

/**
 * Updates a Department's Head
 */
exports.updateDepartmentHead = async (req, res, next) => {
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
     * Find the Department that will be updated
     */
    let department = await Department.findOne({id: req.params.departmentId});  
    if(!department) {
      throw new Error('Department Not Found. Invalid Request');
    }

    // Update the Department Head and Save
    department.departmentHead = req.body.newDepartmentHead;
    await department.save();

    /**
     * Sanity Check. 
     */
    department = await Department.findOne({id: req.params.departmentId});  
    if(!department || department.departmentHead != req.body.newDepartmentHead) {
      throw new Error('Department Head Not Updated.');
    }

    // Return the Department object with updated Name+
    res.status(200).json({
      message: "Updated Department Head",
      department
    });
  } catch (error) {

    // Catches any errors that occur and sends the error message back to client
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}
