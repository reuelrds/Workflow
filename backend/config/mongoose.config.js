
const config = require('./var.config');
const mongoose = require('mongoose');

exports.connectDatabase = async () => {
  try {
    const url = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.authdb}`;
    const opts = {
      useNewUrlParser: true,
      useCreateIndex: true
    }
    await mongoose.connect(url, opts);
    console.log('Connected to database!');
  } catch (error) {
    console.log("Error Connecting to database");
  }
}
