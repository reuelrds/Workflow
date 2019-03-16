const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');


describe('Testing User Endpoint', () => {
  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  test('it should fetch user details', async () => {
    const res = await request(app).get(`/api/user/${dbSetup.userOne.id}`).expect(200);

    expect(res.body).toMatchObject({
      firstName: dbSetup.userOne.firstName,
      lastName: dbSetup.userOne.lastName,
      email: dbSetup.userOne.email
    });
  });

  test('it should throw an error if an invalid id is passed', async () => {
    try {
      await request(app).get('/api/user/error')
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain('User Data Not Found');
    }
  });
});