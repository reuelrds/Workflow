// Configuration File: It Contains values for various variables

const env = process.argv.slice(2);

const defaults = {
  env,
  bcrypt: {
    saltLength: 10
  }
}

const config = {
  dev : {
    ...defaults,
    PORT: 3000,
    jwtsecret: "Ave atque vale. pulvis et umbra sumus",
    mongodb: {
      host: "cluster0-jc3gm.mongodb.net",
      username: "reuelrds",
      password: "7w56L7IkTOmHiQLC",
      authdb: "test"
    },
    imageFolder: "./workflow/backend/images"
  },
  production: {
    ...defaults,
    PORT: process.env.PORT || "3000",
    mongodb: {
      host: "prod-egpb8.mongodb.net",
      username: "reuelrds",
      password: "mD0InLgQ55XrY6t3",
      authdb: "workflow"
    },
    jwtsecret: "Noli timere mortem. Latin nihil enim mori timeret. Quoniam non sumus Pulvis et umbra sumus. Ita, ave atque vale. Sit autem iterum conveniant",
    imageFolder: "images"
  }
};

module.exports = config[env];