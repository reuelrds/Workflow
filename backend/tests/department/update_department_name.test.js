const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Department = require('./../../src/models/department.model');
const Admin = require("./../../src/models/admin.model");

/**
 * Testing Update Department Name Route
 */
describe('Testing updateDepartmentName Endpoint', () => {
  
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

  test('it should update a new Department Name', async () => {
    const res = await request(app)
      .patch(`/api/department/${dbSetup.departmentOne.id}/updateDepartmentName`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        newDepartmentName: "Jest"
      })
      .expect(200);

    expect(res.body.message).toContain("Updated Department Name");
    expect(res.body.department.departmentName).toEqual("Jest");
  });
  
  test('it should throw an error if no Department is found', async () => {
    try {
      await request(app)
        .patch(`/api/department/invalidId/updateDepartmentName`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newDepartmentName: "Test Id"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Department Not Found. Invalid Request");
    }
  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/department/${dbSetup.departmentOne.id}/updateDepartmentName`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          newDepartmentName: "Test Id"
        });
    } catch (error) {
      console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
