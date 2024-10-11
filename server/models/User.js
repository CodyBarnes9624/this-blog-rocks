const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Post.js
const playlistSchema = require('./Playlist');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedPosts to be an array of data that adheres to the postSchema
    savedPosts: [playlistSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// virtual to count the number of saved posts
userSchema.virtual('postCount').get(function () {
  return this.savedPosts.length;
});

const User = model('User', userSchema);

module.exports = User;