const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePicture: { 
    type: String, 
    required: false 
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [],
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [],
  }],
});

module.exports = mongoose.model("User", UserSchema);
