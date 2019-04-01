const Admin = require("../../models/admin.model");
const Department = require('../../models/department.model');


exports.getDepartmentData = async (req, res, next) => {
  try {

    // Sanity Check
    console.log("feggg");
    const admin = await Admin.findOne({id: req.userData.userId});
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    const departmentData = await Department.findOne({id: req.params.departmentId});
    console.log(departmentData);
    if(!departmentData) {
      throw new Error("Department Data Not Found");
    }

    console.log("fefew");

    res.status(200).json({
      department: departmentData
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}