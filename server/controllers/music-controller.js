const Playlist = require('../models/Playlist');

module.exports = {
  getAllPlaylists: async (req, res) => {
    try {
      const playlists = await Playlist.find({});
      res.json(playlists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching playlists' });
    }
  },

  getPlaylistById: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.json(playlist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching the playlist' });
    }
  },

  createPlaylist: async (req, res) => {
    try {
      const newPlaylist = await Playlist.create(req.body);
      res.json(newPlaylist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating playlist' });
    }
  },

  updatePlaylist: async (req, res) => {
    try {
      const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedPlaylist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.json(updatedPlaylist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating playlist' });
    }
  },

  deletePlaylist: async (req, res) => {
    try {
      const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
      if (!deletedPlaylist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.json({ message: 'Playlist deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting playlist' });
    }
  },
};