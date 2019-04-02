const express = require('express');
const router = express.Router();

const CheckAuth = require('./../middleware/check-auth');
const {
  getLocation, 
  postLocation,
  patchLocation } = require('./../controllers/location.controller');

/**
 * Providing Route Handlers for the location route
 */
router.post('/new-location', CheckAuth, postLocation.addLocation);

router.patch(
  '/:locationId/updateLocationName',
  CheckAuth,
  patchLocation.updateLocationName
);
router.patch(
  '/:locationId/updateLocationHead',
  CheckAuth,
  patchLocation.updateLocationHead
);

router.get(
  '/:locationId',
  CheckAuth,
  getLocation.getLocationData
)


module.exports = router;