const router = require('express').Router();
const {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require('../../controllers/music-controller');

// Import middleware to verify JWT
const { authMiddleware } = require('../../utils/auth');

// Public route to get all playlists
router.route('/playlists').get(getAllPlaylists);

// Public route to get a playlist by its ID
router.route('/playlists/:id').get(getPlaylistById);

// Protected route to create a playlist (requires authentication)
router.route('/playlists').post(authMiddleware, createPlaylist);

// Protected route to update a playlist by its ID (requires authentication)
router.route('/playlists/:id').put(authMiddleware, updatePlaylist);

// Protected route to delete a playlist by its ID (requires authentication)
router.route('/playlists/:id').delete(authMiddleware, deletePlaylist);

module.exports = router;