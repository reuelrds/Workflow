const Admin = require('./../../src/models/admin.model');


const adminOne = {
  name: 'AdminTest1',
  email: 'admintest1@email.com',
  password: '1234568'
}
const setupDatabase = async () => {
  await Admin.deleteMany();
  await new Admin(adminOne).save();
}
const teardownDatabase = async () => {
  await Admin.deleteMany();
}



module.exports = {
  adminOne,
  setupDatabase,
  teardownDatabase
};