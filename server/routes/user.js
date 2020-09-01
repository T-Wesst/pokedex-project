const router = require('express').Router();
const { login, signup, logout, cookieCheck } = require('../controllers/user');


router.get('/authorized', cookieCheck);
router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', signup);

module.exports = router;