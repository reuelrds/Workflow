// Configuration File: It Contains values for various variables
const yargs = require('yargs');

const env = yargs.argv.env ?  yargs.argv.env : yargs.argv._[0];

const defaults = {
  env,
  PORT: process.env.PORT || "3000",
  bcrypt: {
    saltLength: 10
  },
  jwtsecret: "Ave atque vale. pulvis et umbra sumus",
}

const config = {
  dev : {
    ...defaults,
    
    mongodb: {
      url: 'mongodb://127.0.0.1:27017/workflow-dev'
    },
    uploadsFolder: "./backend/files/uploads"
  },
  production: {
    ...defaults,
    mongodb: {
      url: 'mongodb+srv://reuelrds:7w56L7IkTOmHiQLC@cluster0-jc3gm.mongodb.net/admin'
    },
    uploadsFolder: "./files/uploads"
  },
  test: {
    ...defaults,
    mongodb: {
      url: 'mongodb://127.0.0.1:27017/workflow-test'
    },
    uploadsFolder: "./__tests__/files/uploads"
  }
};

module.exports = config[env];
