const router = require('express').Router();
const {
  getFeaturedPlaylist,

} = require('../../controllers/api-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getFeaturedPlaylist);


module.exports = router;
