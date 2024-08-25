const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

router.get('/user', auth, getUserData);

module.exports = router;
