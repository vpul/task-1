const router = require('express').Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const validateSignup = require('../middleware/signupValidator');

router.post('/signup', validateSignup, signup);
router.post('/login', login);

module.exports = router;
