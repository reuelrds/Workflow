const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('testing update-department endpoint', () => {

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

  test('it should update a user\'s departmentId', async () => {
    
    const result = await request(app)
      .patch(`/api/user/update-department/${dbSetup.userTwo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        departmentId: "Test Id"
      }).expect(200);

    expect(result.body.message).toContain("Successfully Updated User's Department");
    expect(result.body.user.departmentId).toMatch("Test Id");
    
  });
  
  test('it should throw an error if no user is found', async () => {
    try {
      await request(app)
        .patch(`/api/user/update-department/invalidId`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          departmentId: "Test Id"
      });
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User Not Found. Invalid Request");
    }
  });
  
  test('it should throw an error if no user is not updated to manager', async () => {
    try {
      
      User.schema.path('departmentId').set(function (departmentId) {
        departmentId = "";
      });

      await request(app)
        .patch(`/api/user/update-department/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          departmentId: "Test Id"
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User's Department not updated");
    }
  });
  
  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/user/update-department/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          departmentId: "Test Id"
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
