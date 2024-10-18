// Import Mongoose
const mongoose = require('mongoose');

// Define the playlist schema
const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  songs: [
    {
      title: String,
      artist: String,
      duration: Number // In seconds
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Playlist model

module.exports = playlistSchema;
