const Admin = require('./../../src/models/admin.model');
const User = require('./../../src/models/user.model');


const adminOne = {
  name : "Postman Test",
  email : "postmanadmintest@email.com",
  password : "$2a$10$3NkKlTsUoPI2IKu6w.Vo6uY7P5JMyfBqvlZk4tOjRsXTA8AdwtpzC",
  id : "105c1q1ebojta8xc5x",
}

const userOne = {
  profileImagePath : "http://localhost:3000/images/null",
  firstName : "Postman",
  lastName : "Individual User 1",
  email : "postmanindividualuser@email.com",
  password : "$2a$10$06Y/H1o7dIsnN7X8nT2rveUGzbSFoOFkuvHWZLIlzkf3xLvxn058G",
  id : "105c1q1jd4jtagec7i",
}

const userTwo = {
  profileImagePath : "http://localhost:3000/images/null",
  firstName : "Postman",
  lastName : "Client User 1",
  email : "postmanclientuser@email.com",
  password : "$2a$10$BCTwVVLorYUf99rSNODtS.oVUNwTqJzH6ymOUoh1ggAOcZaDOuBey",
  id : "105c1q1i6kjtagiauo",
  companyId : "105c1q1ebojta8xc5x",
}
const setupDatabase = async () => {
  await Admin.deleteMany();
  await User.deleteMany();
  await new Admin(adminOne).save();
  await new User(userOne).save();
  await new User(userTwo).save();
}



module.exports = {
  adminOne,
  userOne,
  userTwo,
  setupDatabase
};