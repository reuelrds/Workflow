const jwt = require('jsonwebtoken');

const config = require('./../config/var.config');


// Checks if an incomming request has a valid token or not
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwtsecret);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch(error) {
    res.status(401).json({message: "Auth failed! Unauthorized Token expired or invalid"});
  }
}