
const config = require('./var.config');
const mongoose = require('mongoose');

exports.connectDatabase = async () => {
  try {
    const url = config.mongodb.url;
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
