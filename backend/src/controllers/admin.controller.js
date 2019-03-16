const Admin = require("./../models/admin.model");

exports.getAdminData = async (req, res, next) => {
  try {

    const AdminData = await Admin.findOne({id: req.params.id});
    console.log(AdminData);
    res.status(200).json({
      name: AdminData.name,
      email: AdminData.email
    });
    
  } catch (error) {
    res.status(404).json({
      message: "Admin Data Not Found"
    })
  }
}