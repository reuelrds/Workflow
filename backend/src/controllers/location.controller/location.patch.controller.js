const uniqid = require('uniqid');

const Admin = require("../../models/admin.model");
const User = require("../../models/user.model");
const Location = require('../../models/location.model');


/**
 * Updates a Location's Name
 */
exports.updateLocationName = async (req, res, next) => {
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
     * Find the location that will be updated
     */
    let location = await Location.findOne({id: req.params.locationId});  
    if(!location) {
      throw new Error('Office Location Not Found. Invalid Request');
    }

    // Update the location Name and Save
    location.locationName = req.body.newLocationName;
    await location.save();

    // Return the location object with updated Name+
    res.status(200).json({
      message: "Updated Office Location Name",
      location
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
 * Updates a L's Head
 */
exports.updateLocationHead = async (req, res, next) => {
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
     * Find the location that will be updated
     */
    let location = await Location.findOne({id: req.params.locationId});  
    if(!location) {
      throw new Error('Office Location Not Found. Invalid Request');
    }

    // Update the location Head and Save
    location.locationHead = req.body.newLocationHead;
    await location.save();

    /**
     * Sanity Check. 
     */
    location = await Location.findOne({id: req.params.locationId});
    if(!location || location.locationHead != req.body.newLocationHead) {
      throw new Error('Location Head Not Updated.');
    }

    // Return the location object with updated Name+
    res.status(200).json({
      message: "Updated Office Location Head",
      location
    });
  } catch (error) {

    // Catches any errors that occur and sends the error message back to client
    console.log(error);
    res.status(404).json({
      message: error.message
    })
  }
}
