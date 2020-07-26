const router = require('express').Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
