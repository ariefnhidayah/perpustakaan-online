var express = require('express');
const DashboardController = require('../controllers/DashboardController');
var router = express.Router();
const auth = require('../middlewares/auth')

router.get('/', auth, new DashboardController().index);

module.exports = router;
