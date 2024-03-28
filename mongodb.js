const mongoose = require("mongoose");

const mongourl = "mongodb://127.0.0.1:27017/UserAccounts";

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.log("ERROR IN DATABASE CONNECTION");
  });

const loginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", loginSchema); // Changed "users" to "User"

module.exports = User;
