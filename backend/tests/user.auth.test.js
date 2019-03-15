const request = require('supertest')

const dbSetup = require('./fixtures/testdb.config');

const app = require('./../src/app');
const db = require('./../src/config/mongoose.config');

const User = require('./../src/models/user.model');

describe('Testing User Auth Route', () => {

  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  })


  test('it should successfully create a User', async () => {
    console.log('ewfw');
    const res = await request(app)
      .post('/api/auth/user-signup')
      .send({
        firstName: 'Jest',
        lastName: 'Testing',
        email: 'jest@email.com',
        password: '123456'
      })
      .expect(201);

      // Assert that the Database was changed correctly
      console.log(res.body);
      const user = await User.findOne({id: res.body.userId});
      expect(user).not.toBeNull();
      console.log(user);
      expect(user.password).not.toBe('123456');


      // Assertions about response body
      expect(res.body).toMatchObject({
        message: 'User Created!',
        usertype: 'User',
        expiresIn: 3600,
        userId: user.id
      });

      expect(res.body.jwtToken).toBeDefined();
  });

  test('it should not create a new User with same email', async() => {
    let res;
    try {
      res = await request(app).post('/api/auth/user-signup').send({
        firstName: 'ref',
        lastName: 'refs',
        email: 'usertest1@email.com',
        password: '12345678'
      });
    } catch(error) {
      console.log(error.response.body.message);
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Creating User Failed!');
    }

  });
});