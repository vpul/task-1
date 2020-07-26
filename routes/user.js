const router = require('express').Router();
const { getUserProfile } = require('../controllers/user');
const validateAuthToken = require('../middleware/authTokenValidator');

router.get('/', validateAuthToken, getUserProfile);

module.exports = router;
