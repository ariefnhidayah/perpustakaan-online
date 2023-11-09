var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const ReturnBookController = require('../controllers/ReturnBookController');

router.use(auth)
router.get('/', new ReturnBookController().index);
router.get('/:id', new ReturnBookController().return_book_action);

module.exports = router;
