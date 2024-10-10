const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  songTitle: {
    type: String,
    required: true,
  },
  songLink: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;