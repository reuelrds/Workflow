const Admin = require('./../../src/models/admin.model');
const User = require('./../../src/models/user.model');
const Department = require('./../../src/models/department.model');
const Location = require('./../../src/models/location.model');
const Group = require('./../../src/models/group.model');


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

const userThree = { 
  firstName: 'Postman',
  lastName: 'Client User 2',
  email: 'postmanclientuser2@email.com',
  password:'$2a$10$ZMFkFuj6C67DPrRj1umz3OOVkPuYUm8nuaUPJsYst.WjiB9E9V6Ay',
  id: '105c1q1o04jtytbyhu',
  companyId: '105c1qjksjtu5q682',
}

const departmentOne = {
  id: "105c1q1os0jtyspts2",
  departmentName: "Test Department",
  departmentHead: "105c1q1i6kjtagiauo"
}

const locationOne = {
  id: "105c1q1bawjtzfz4r6",
  locationName: "Test Location",
  locationHead: "105c1qjksjtu5r6lk"
}

const groupOne = {
  id: "105c1qcrkju2scltj",
  groupName: "Test Group"
}

const setupDatabase = async () => {
  await Admin.deleteMany();
  await User.deleteMany();
  await Department.deleteMany();
  await Location.deleteMany();
  await Group.deleteMany();

  await new Admin(adminOne).save();
  
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
  
  await new Department(departmentOne).save();
  
  await new Location(locationOne).save();

  await new Group(groupOne).save();
}



module.exports = {
  adminOne,
  userOne,
  userTwo,
  userThree,
  departmentOne,
  locationOne,
  groupOne,
  setupDatabase
};