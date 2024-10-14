const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tracks: [
    {
      title: String,
      artist: String,
      album: String,
      url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {  // Optional: track which user created the playlist
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Playlist', playlistSchema);