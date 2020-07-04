/**
 * profile model: will define a model for a users profile
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //this is the users id (See atlas)
    ref: 'user'
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  social: {
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    youtube: {
      type: String,
    }
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

// export this model to be put in profile routes to query DB, get profiles, CRUD etc
module.exports = Profile = mongoose.model('profile', ProfileSchema)