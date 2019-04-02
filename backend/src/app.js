const app = require('./config/express.config');

const db = require("./config/mongoose.config");

const authRoute = require('./routes/auth.route');

const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route');

const departmentRoute = require('./routes/department.route');
const locationRoute = require('./routes/location.route');
// const groupRoute = require('./routes/group.route');


// Routing requests according to their specified endpoints
app.use("/api/auth", authRoute);

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

app.use("/api/department", departmentRoute);
app.use("/api/location", locationRoute);
// app.use("/api/group", groupRoute);

module.exports = app;