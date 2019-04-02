const uniqid = require('uniqid');

const Admin = require("../../models/admin.model");
const Location = require('../../models/location.model');


/**
 * Method to Create a New Office Location
 */
exports.addLocation = async (req, res, next) => {
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

    // Create a newLocation Object
    const id = uniqid()
    const newLocation = {
      id,
      locationName: req.body.locationName,
      locationHead: req.body.locationHead,
    };

    // Save it to the Database
    const location = await Location(newLocation).save()
    console.log(location);

    // Return it back to client side
    res.status(201).json({
      message: "Added new location",
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
