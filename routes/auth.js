const router = require('express').Router();
const multer = require('multer');
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const validateSignup = require('../middleware/signupValidator');

const upload = multer({ dest: 'public/uploads/' });
router.post('/signup', upload.single('photo'), validateSignup, signup);
router.post('/login', login);

module.exports = router;
