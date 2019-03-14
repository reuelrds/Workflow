const Admin = require('./../../src/models/admin.model');

const setupDatabase = async () => {
  await Admin.deleteMany();
}

module.exports = {
  setupDatabase
};