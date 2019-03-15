const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const Admin = require('./../../src/models/admin.model');

describe('Testing Admin Endpoint', async () => {
  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  test('it should fetch admin details', async () => {
    const res = await request(app).get(`/api/admin/${dbSetup.adminOne.id}`).expect(200);

    expect(res.body).toMatchObject({
      name: dbSetup.adminOne.name,
      email: dbSetup.adminOne.email
    });
  });

  test('it should throw an error if an invalid id is passed', async () => {
    try {
      await request(app).get('/api/admin/error')
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain('Admin Data Not Found');
    }
  });
});