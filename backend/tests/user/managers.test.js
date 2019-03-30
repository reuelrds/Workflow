const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Admin = require('./../../src/models/admin.model');


describe('testing get managers endpoint', () => {

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

  test('it should return an array containing all managers', async () => {

    await request(app)
      .post('/api/user/add-new-manager')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: dbSetup.userTwo.id
      });
    
    const result = await request(app)
      .get('/api/user/managers')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const {companyId, password, profileImagePath,...managerDetails} = dbSetup.userTwo;
    const expectedManagers = [
      managerDetails
    ]
    expect(result.body.managers).toEqual(expectedManagers);
  });

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .get('/api/user/managers')
        .set('Authorization', `Bearer ${token}`);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});