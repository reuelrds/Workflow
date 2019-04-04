const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('testing update-group endpoint', () => {

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

  test('it should update a user\'s groupId', async () => {
    
    const result = await request(app)
      .patch(`/api/user/update-group/${dbSetup.userTwo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        groupId: "Test Id"
      }).expect(200);

    expect(result.body.message).toContain("Successfully Updated User's Group");
    expect(result.body.user.groupId).toMatch("Test Id");
    
  });
  
  test('it should throw an error if no user is found', async () => {
    try {
      await request(app)
        .patch(`/api/user/update-group/invalidId`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          groupId: "Test Id"
      });
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User Not Found. Invalid Request");
    }
  });
  
  test('it should throw an error if no user is not updated to manager', async () => {
    try {
      
      User.schema.path('groupId').set(function (groupId) {
        groupId = "";
      });

      await request(app)
        .patch(`/api/user/update-group/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          groupId: "Test Id"
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User's Group not updated");
    }
  });
  
  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/user/update-group/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          groupId: "Test Id"
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
