const Admin = require("../../models/admin.model");
const Location = require('../../models/location.model');


/**
 * Retrieves a Location Data
 */
exports.getLocationData = async (req, res, next) => {
  try {

    // Sanity Check
    const admin = await Admin.findOne({id: req.userData.userId});
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    // Try to query a Location based on given id
    const locationData = await Location.findOne({id: req.params.locationId});
    console.log(locationData);
    if(!locationData) {
      throw new Error("location Data Not Found");
    }

    // Send the response back
    res.status(200).json({
      location: locationData
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}

/**
 * Get a list containing all locations
 */
exports.getAllLocations = async (req, res, next) => {
  try {
    
    // Sanity Check
    console.log("feggg");
    const admin = await Admin.findOne({id: req.userData.userId});
    if(!admin) {
      throw new Error('Admin Not Found. Invalid Request');
    }

    // find all locations and return the result back to client
    const locations = await Location.find();
    res.status(200).json({
      locations 
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}
