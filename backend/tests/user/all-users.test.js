const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Admin = require('./../../src/models/admin.model');


describe('testing all-users endpoint', () => {

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

  test('it should fetch all users associated with the auth token', async () => {

    const res = await request(app)
      .get('/api/user/all-users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const {profileImagePath, companyId, password, ...userDetails} = dbSetup.userTwo;
    const expectedUsers = [
      userDetails
    ];

    expect(res.body.users).toMatchObject(expectedUsers);
  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .get('/api/user/all-users')
        .set('Authorization', `Bearer ${token}`);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  })
});