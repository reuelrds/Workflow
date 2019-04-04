const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('testing update-manager endpoint', () => {

  let token = null;
  let manager = null;
  
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

    const newUser = await request(app)
      .post(`/api/user/add-new-user`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        firstName: 'new',
        lastName: 'test',
        email: 'new@email.com'
      });
    
    manager = newUser.body.user;
  });

  afterEach(async () => {
    await db.disconnect();
  });

  test('it should add a user\'s managerId to a new managerId', async () => {
    
    

    const result = await request(app)
      .patch(`/api/user/update-manager/${dbSetup.userTwo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        managerId: manager.id
      }).expect(200);

    expect(result.body.message).toContain("Successfully Updated User's new Manager");
    expect(result.body.user.managerId).toMatch(manager.id);
    expect(result.body.manager.isManager).toBeTruthy();
    
  });
  
  test('it should update an user\'s prevoius manager\'s  isManager to False if the manager has no staff working under him', async () => {

    await request(app)
      .patch(`/api/user/update-manager/${dbSetup.userTwo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        managerId: manager.id
      }).expect(200);

    const result = await request(app)
      .patch(`/api/user/update-manager/${dbSetup.userTwo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({}).expect(200);

    expect(result.body.message).toContain("Successfully Updated User's new Manager");
    expect(result.body.user.managerId).toBeUndefined();
    expect(result.body.manager.isManager).toBeFalsy();
    
  });



  
  test('it should throw an error if no user is found', async () => {
    try {
      await request(app)
        .patch(`/api/user/update-manager/invalidId`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          managerId: manager.id
      });
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User Not Found. Invalid Request");
    }
  });
  
  test('it should throw an error if no user is not updated to manager', async () => {
    try {
      
      User.schema.path('managerId').set(function (managerId) {
        managerId = false;
      });

      await request(app)
        .patch(`/api/user/update-manager/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          managerId: manager.id
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("User not updated");
    }
  });
  
  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .patch(`/api/user/update-manager/${dbSetup.userTwo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          managerId: manager.id
      })
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
