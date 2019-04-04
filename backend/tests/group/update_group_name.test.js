const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const group = require('./../../src/models/group.model');
const Admin = require("./../../src/models/admin.model");

/**
 * Testing Update group Name Route
 */
describe('Testing updateGroupName Endpoint', () => {
  
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

  test('it should update a new group Name', async () => {
    const res = await request(app)
      .patch(`/api/group/${dbSetup.groupOne.id}/updateGroupName`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        newGroupName: "Jest"
      })
      .expect(200);

    expect(res.body.message).toContain("Updated Group Name");
    expect(res.body.group.groupName).toEqual("Jest");
  });
  
  test('it should throw an error if no group is found', async () => {
    try {
      await request(app)
        .patch(`/api/group/invalidId/updateGroupName`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newGroupName: "Test Id"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Group Not Found. Invalid Request");
    }
  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/group/${dbSetup.groupOne.id}/updateGroupName`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newGroupName: "Test Id"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
