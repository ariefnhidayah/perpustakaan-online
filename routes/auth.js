var express = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');
var router = express.Router();

router.get('/login', new AuthenticationController().login)
router.post('/login', new AuthenticationController().login_action)
router.get('/register', new AuthenticationController().register)
router.post('/register', new AuthenticationController().register_action)
router.get('/logout', new AuthenticationController().logout)

module.exports = router