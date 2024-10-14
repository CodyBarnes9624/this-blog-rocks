const router = require('express').Router();
const userRoutes = require('./user-routes');
const musicRoutes = require('./music-routes');  // Import music-related routes

// Use the user routes for anything related to users
router.use('/users', userRoutes);

// Use the music routes for anything related to music (playlists, etc.)
router.use('/music', musicRoutes);

module.exports = router;