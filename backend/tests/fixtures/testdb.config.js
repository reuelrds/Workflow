const Admin = require('./../../src/models/admin.model');
const User = require('./../../src/models/user.model');


const adminOne = {
  name: 'AdminTest1',
  email: 'admintest1@email.com',
  password: '1234568'
}

const userOne = {
  firstName: 'User1',
  lastName: 'Tests',
  email: 'usertest1@email.com',
  password: '1234568'
}
const setupDatabase = async () => {
  await Admin.deleteMany();
  await User.deleteMany();
  await new Admin(adminOne).save();
  await new User(userOne).save();
}



module.exports = {
  adminOne,
  userOne,
  setupDatabase
};