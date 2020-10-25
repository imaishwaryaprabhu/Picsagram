const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true,
    trim: true
  },
  lastname: {
      type: String,
      minlength: 5,
      maxlength: 20,
      required: true,
      trim: true
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true,
    trim: true,
    unique: true
  },
  email: { 
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
