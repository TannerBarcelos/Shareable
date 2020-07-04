const mongoose = require('mongoose');

const Schema = mongoose.Schema; // this is one way of making a schema instance. It just makes line 5 new Schema nicer than new mongoose.Schema()
// creates a model of what it means to be a user in our app
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserSchema);