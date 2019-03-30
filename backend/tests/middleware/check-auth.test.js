const request = require('supertest')

const dbSetup = require('../fixtures/testdb.config');

const app = require('./../../src/app');
const db = require('./../../src/config/mongoose.config');

const auth = require('./../../src/middleware/check-auth');


describe('Testing Check Auth Middleware', () => {
  
  let token = null;
  const next = jest.fn();
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
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

  test('it should foward request if the token is valid', () => {
    
    const request = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    const res = mockResponse();

    auth(request, res, next);
    
    expect(next).toHaveBeenCalled();
    expect(request.userData).toMatchObject({
      email: dbSetup.adminOne.email,
      userId: dbSetup.adminOne.id
    });
  });

  test('it should throw an error if invalid token is passed', () => {
    const request = {
      headers: {
        authorization: `Bearer invalidToken`
      }
    };
    const res = mockResponse();
    
    auth(request, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Auth failed! Unauthorized Token expired or invalid" });
    
  });
});