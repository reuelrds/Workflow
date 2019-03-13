// Configuration File: It Contains values for various variables
const yargs = require('yargs');

const env = yargs.argv._[0] ? yargs.argv._[0] : yargs.argv.env;

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
      url: 'mongodb+srv://reuelrds:7w56L7IkTOmHiQLC@cluster0-jc3gm.mongodb.net/test'
    },
    uploadsFolder: "./workflow/backend/files/uploads"
  },
  production: {
    ...defaults,
    mongodb: {
      url: 'mongodb+srv://reuelrds:mD0InLgQ55XrY6t3@prod-egpb8.mongodb.net/workflow'
    },
    uploadsFolder: "./files/uploads"
  },
  test: {
    ...defaults,
    url: `mongodb://127.0.0.1:24017/workflow-test`,
    uploadsFolder: "./__tests__/files/uploads"
  }
};

module.exports = config[env];