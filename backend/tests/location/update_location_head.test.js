const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Location = require('./../../src/models/location.model');
const Admin = require("./../../src/models/admin.model");

/**
 * Testing Update Location Head Route
 */
describe('Testing updateLocationHead Endpoint', () => {
  
 // For CheckAuth Purpose
  let token = null;
  
  beforeEach(async () => {
    
    // Connect and restore Database
    await db.connect();
    await dbSetup.setupDatabase();
    
    // Get JWT Token for making further requests
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .set('Authorization', 'Bearer ' + token)
      .send({
      email: dbSetup.adminOne.email,
      password: '123456'
    });
    
    token = adminLogin.body.jwtToken;
  });

  afterEach(async () => {

    // Disconnect
    await db.disconnect();
  });

  test('it should update a new location Head', async () => {
    const res = await request(app)
      .patch(`/api/location/${dbSetup.locationOne.id}/updateLocationHead`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        newLocationHead: "Test Id"
      })
      .expect(200);

    expect(res.body.message).toContain("Updated Office Location Head");
    expect(res.body.location.locationHead).toEqual("Test Id");
  });
  
  test('it should throw an error if no location is found', async () => {
    try {
      await request(app)
        .patch(`/api/location/invalidId/updateLocationHead`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newLocationHead: "Test Id"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Office Location Not Found. Invalid Request");
    }
  });

  test('it should throw an error if the location Head is not updated', async () => {
    try {
      
      Location.schema.path('locationHead').set(function (locationHead) {
        locationHead = '';
      });

      await request(app)
        .patch(`/api/location/${dbSetup.locationOne.id}/updateLocationHead`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newLocationHead: "Test Id"
      });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Location Head Not Updated.");
    }
  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/location/${dbSetup.locationOne.id}/updateLocationHead`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newLocationHead: "Test Id"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
