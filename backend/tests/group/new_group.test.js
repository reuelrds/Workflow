const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Admin = require("./../../src/models/admin.model");

/**
 * Testing new-group Route
 */
describe('Testing new-group Endpoint', () => {
  
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

  test('it should create a new group', async () => {
    const res = await request(app)
      .post(`/api/group/new-group`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        groupName: "Test Name"
      })
      .expect(201);

    expect(res.body.message).toContain("Added new Group");
    expect(res.body.group).toMatchObject({
      groupName: "Test Name"
    });

  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .post(`/api/group/new-group`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          groupName: "Test Name"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
