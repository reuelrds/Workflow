const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('Testing Login', () => {
  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  })

  test('should login an admin successfully', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: dbSetup.adminOne.email,
      password: '123456'
    }).expect(200);

    expect(res.body).toMatchObject({
      usertype: 'Admin',
      expiresIn: 3600,
      userId: dbSetup.adminOne.id
    });
    expect(res.body.jwtToken).toBeDefined();
  });
  
  test('should login a user successfully', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: dbSetup.userOne.email,
      password: '123456'
    }).expect(200);

    expect(res.body).toMatchObject({
      usertype: 'User',
      expiresIn: 3600,
      userId: dbSetup.userOne.id
    });
    expect(res.body.jwtToken).toBeDefined();
  });

  test('it should throw an error is user isn\'t found in the Database', async () => {

    try {

      await request(app).post('/api/auth/login').send({
        email: 'error@email.com',
        password: '123456'
      })
    } catch(error) {
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Login Failed!');
    }
  });
  
  test('it should throw an error when wrong password is received', async () => {

    try {

      await request(app).post('/api/auth/login').send({
        email: dbSetup.userOne.email,
        password: 'error'
      })
    } catch(error) {
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Passwords don\'t match');
    }
  });

});