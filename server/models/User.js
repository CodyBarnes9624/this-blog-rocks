const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// You can remove this since you're not embedding the entire Playlist schema
// const playlistSchema = require('./Playlist'); 

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
    // Referencing Post model by ObjectId
    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post', // Assuming you have a 'Post' model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check password validity
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual to count saved posts
userSchema.virtual('postCount').get(function () {
  return this.savedPosts.length;
});

const UserModel = model('User', userSchema);

module.exports = UserModel;
