const app = require('./config/express.config');

const authRoute = require('./routes/auth.route');
const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route');
const db = require("./config/mongoose.config");


// Routing requests according to their specified endpoints
app.use("/api/auth", authRoute);

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

module.exports = app;