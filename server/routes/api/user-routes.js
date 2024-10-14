const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePlaylist,      // Function to save a playlist
  deletePlaylist,    // Function to delete a playlist
  login,
} = require('../../controllers/user-controller');

// Import auth middleware to verify the token
const { authMiddleware } = require('../../utils/auth');

// Routes for user registration and login
router.route('/register').post(createUser);
router.route('/login').post(login);

// Routes for authenticated user to get profile and manage playlists
router.route('/me').get(authMiddleware, getSingleUser);  // Fetch user profile

router.route('/playlists').put(authMiddleware, savePlaylist);  // Save a playlist
router.route('/playlists/:playlistId').delete(authMiddleware, deletePlaylist);  // Delete a playlist

module.exports = router;