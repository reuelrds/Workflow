const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('testing update-location endpoint', () => {

  let token = null;
  
  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();

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
    await db.disconnect();
  });

  test('it should update a user\'s locationId', async () => {
    
    const result = await request(app)
      .patch(`/api/user/update-location/${dbSetup.userTwo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        locationId: "Test Id"
      }).expect(200);

    expect(result.body.message).toContain("Successfully Updated User's Location");
    expect(result.body.user.locationId).toMatch("Test Id");
    
  });
  
  test('it should throw an error if no user is found', async () => {
    try {
      await request(app)
        .patch(`/api/user/update-location/invalidId`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          locationId: "Test Id"
      });
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User Not Found. Invalid Request");
    }
  });
  
  test('it should throw an error if no user is not updated to manager', async () => {
    try {
      
      User.schema.path('locationId').set(function (locationId) {
        locationId = "";
      });

      await request(app)
        .patch(`/api/user/update-location/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          locationId: "Test Id"
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User's Location not updated");
    }
  });
  
  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/user/update-location/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          locationId: "Test Id"
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
