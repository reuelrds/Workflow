const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('testing add-new-user endpoint', () => {

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

  test('it should add a new user with a default password', async () => {

    let token = null;
    const adminLogin = await request(app).post('/api/auth/login').send({
      email: dbSetup.adminOne.email,
      password: '123456'
    });
    token = adminLogin.body.jwtToken;

    const res = await request(app)
      .post(`/api/user/add-new-user`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        firstName: 'new',
        lastName: 'test',
        email: 'new@email.com'
      })
      .expect(201);

    console.log(res.body);
    const fetchedUser = await User.findOne({id: res.body.user.id});
    expect(fetchedUser).not.toBeNull();
    console.log(fetchedUser);
    expect(fetchedUser.password).not.toBeNull();

     // Assertions about response body
     expect(res.body).toMatchObject({
      message: 'Added User',
      user: {
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        email: fetchedUser.email,
        id: fetchedUser.id
      }
    });
  })

  test('it should throw an error if no admin is found', async () => {
    try {
      await Admin.deleteOne({id: dbSetup.adminOne.id});
      await request(app)
        .post('/api/user/add-new-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'new',
          lastName: 'test',
          email: 'new@email.com'
        });
    } catch (error) {
      // console.log(error);
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain("Admin Not Found. Invalid Request");
    }
  });
});
