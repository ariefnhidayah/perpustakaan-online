var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const SearchBookController = require('../controllers/SearchBookController');

router.use(auth)
router.get('/', new SearchBookController().index);
router.get('/:id/loan', new SearchBookController().loan)
router.post('/:id/loan', new SearchBookController().loan_action)

module.exports = router;
