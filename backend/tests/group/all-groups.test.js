const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Group = require('./../../src/models/group.model');
const Admin = require("./../../src/models/admin.model");

/**
 * Testing Get all-groups Route
 */
describe('Testing get all-groups Endpoint', () => {
  
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

  test('it should fetch a list containing all groups', async () => {
    const result = await request(app)
      .get(`/api/group/all-groups`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);

    expect(result.body.groups).toMatchObject([dbSetup.groupOne]);
  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .get(`/api/group/all-groups`)
        .set('Authorization', 'Bearer ' + token);
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});