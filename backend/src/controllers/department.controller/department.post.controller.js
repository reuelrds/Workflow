const uniqid = require('uniqid');

const Admin = require("../../models/admin.model");
const Department = require('../../models/department.model');


/**
 * Method to Create a New Department
 */
exports.addDepartment = async (req, res, next) => {
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

    // Create a newDepartment Object
    const id = uniqid()
    const newDepartment = {
      id,
      departmentName: req.body.departmentName,
      departmentHead: req.body.departmentHead,
    };

    // Save it to the Database
    const department = await Department(newDepartment).save()
    console.log(department);

    // Return it back to client side
    res.status(201).json({
      message: "Added new Department",
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
