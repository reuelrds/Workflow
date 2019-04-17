const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');

describe('Testing User Auth Route', () => {

  beforeEach(async () => {
    await db.connect();
    await dbSetup.setupDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  })


  test('it should successfully create an individual User', async () => {
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
        expiresIn: 86400,
        userId: user.id
      });

      expect(res.body.jwtToken).toBeDefined();
  });
  
  test('it should successfully create a new user associated with a company', async() => {
    const admin = await Admin.findOne({email: 'postmanadmintest@email.com'});
    const res = await request(app)
      .post('/api/auth/user-signup')
      .send({
        firstName: 'Jest',
        lastName: 'Testing',
        email: 'jest@email.com',
        password: '123456',
        token: admin.id
      })
      .expect(201);

      // Assert that the Database was changed correctly
      console.log(res.body);
      const user = await User.findOne({id: res.body.userId});
      expect(user).not.toBeNull();
      console.log(user);
      expect(user.password).not.toBe('123456');
      expect(user.companyId).toBe(admin.id);


      // Assertions about response body
      expect(res.body).toMatchObject({
        message: 'User Created!',
        usertype: 'User',
        expiresIn: 86400,
        userId: user.id
      });

      expect(res.body.jwtToken).toBeDefined();
  });

  test('it should create a user with a profile picture', async () => {

    const res = await request(app)
      .post('/api/auth/user-signup')
      .type('form')
      .field('firstName', 'Avatar')
      .field('lastName', 'Test1')
      .field('email', 'avatartest@email.com')
      .field('password', '123456')
      .attach('img', './backend/tests/fixtures/avatar.jpg').expect(201);
      
    const user = await User.findOne({id: res.body.userId});
    expect(user).not.toBeNull();
    console.log(user);
    expect(user.profileImagePath).not.toContain('null');
  });

  test('it should not create a user having invaild company token/id', async () => {
    let res;
    try{
      res = await request(app).post('/api/auth/user-signup').send({
        firstName: 'Jest',
        lastName: 'Testing',
        email: 'jest@email.com',
        password: '123456',
        token: 'shouldThwor Error'
      });
    } catch(error) {
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Creating User Failed!');
    }
  });

  test('it should not create a new User with same email', async() => {
    let res;
    try {
      res = await request(app).post('/api/auth/user-signup').send({
        firstName: 'ref',
        lastName: 'refs',
        email: 'postmanadmintest@email.com',
        password: '12345678'
      });
    } catch(error) {
      console.log(error.response.body.message);
      expect(error.status).toBe(500);
      expect(error.response.body.message).toContain('Creating User Failed!');
    }

  });

});