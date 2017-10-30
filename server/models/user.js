const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model Definition
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String }
});

// Model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;