const request = require('supertest');
const app = require('./../src/app');
const db = require('./../src/config/mongoose.config');
const dbSetup = require('./__fixtures__/testdb.config');

describe('Testing Auth Route', () => {

  beforeEach(() => {
    db.connect();
    dbSetup.setupDatabase();
  });

  afterEach(() => {
    db.disconnect();
  });

  test('it should successfully create an Admin', async () => {
    const res = await request(app)
      .post('/api/auth/admin-signup')
      .send({
        companyName: 'Jest',
        email: 'jest@email.com',
        password: '123456'
      })
      .expect(201);
  });
});