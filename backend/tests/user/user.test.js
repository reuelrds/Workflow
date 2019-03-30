const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const User = require('./../../src/models/user.model');
const Admin = require('./../../src/models/admin.model');


describe('Testing User Endpoint', () => {
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

  test('it should fetch user details', async () => {
    const res = await request(app)
      .get(`/api/user/${dbSetup.userOne.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);

    expect(res.body).toMatchObject({
      firstName: dbSetup.userOne.firstName,
      lastName: dbSetup.userOne.lastName,
      email: dbSetup.userOne.email
    });
  });

  test('it should throw an error if an invalid id is passed', async () => {
    try {
      await request(app)
        .get(`/api/user/error`)
        .set('Authorization', 'Bearer ' + token)
      
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response.body.message).toContain('User Data Not Found');
    }
  });

  describe('testing add-new-user endpoint', () => {

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

  describe('testing all-users endpoint', () => {

    test('it should fetch all users associated with the auth token', async () => {

      const res = await request(app)
        .get('/api/user/all-users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const {profileImagePath, companyId, password, ...userDetails} = dbSetup.userTwo;
      const expectedUsers = [
        userDetails
      ];
  
      expect(res.body.users).toEqual(expectedUsers);
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
});