const yargs = require('yargs');
const fs = require('fs-extra');

// Set Environment vairable to use test config
yargs.parse(['--env', 'test']);


// Cleaning up uploads folder after every test
try {
  fs.emptyDirSync('./backend/tests/files/uploads');
  fs.ensureDirSync('./backend/tests/files/uploads/avatars');
} catch(err) {
  console.log(err);
}