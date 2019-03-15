const request = require('supertest');
const app = require('./../src/app');
const db = require('./../src/config/mongoose.config');
const dbSetup = require('./fixtures/testdb.config');
const Admin = require('./../src/models/admin.model');

describe('Testing Admin Auth Route', () => {

  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  })


  test('it should successfully create an Admin', async () => {
    const res = await request(app)
      .post('/api/auth/admin-signup')
      .send({
        companyName: 'Jest',
        email: 'jest@email.com',
        password: '123456'
      })
      .expect(201);

      // Assert that the Database was changed correctly
      // console.log(res.body);
      const admin = await Admin.findOne({id: res.body.userId});
      expect(admin).not.toBeNull();
      // console.log(admin);
      expect(admin.password).not.toBe('123456');


      // Assertions about response body
      expect(res.body).toMatchObject({
        message: 'User Created!',
        usertype: 'Admin',
        expiresIn: 3600,
        userId: admin.id
      });

      expect(res.body.jwtToken).toBeDefined();

      expect(res.body.jwtToken).toBeDefined();
  });

  test('it should not create a new Admin with same email', async() => {
    let res;
    try {
      res = await request(app).post('/api/auth/admin-signup').send({
        companyName: 'ref',
        email: 'admintest1@email.com',
        password: '12345678'
      });
    } catch(error) {
      // console.log(error.response.body.message);
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Creating Admin Failed!');
    }

  });

  test('it should not create a new Admin with same Company name', async() => {
    let res;
    try {
      res = await request(app).post('/api/auth/admin-signup').send({
        companyName: 'AdminTest1',
        email: 'test@email.com',
        password: '12345678'
      });
    } catch(error) {
      // console.log(error.response.body.message);
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Creating Admin Failed!');
    }
  });
});