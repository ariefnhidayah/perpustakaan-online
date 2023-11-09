var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const { upload } = require('../middlewares/uploadImage')
const BookController = require('../controllers/BookController');

router.use(auth)
router.get('/', new BookController().index);
router.get('/add', new BookController().add)
router.post('/add', upload, new BookController().add_action)

router.get('/:id/edit', new BookController().edit)
router.post('/:id/edit', upload, new BookController().edit_action)

router.get('/:id/delete', new BookController().delete)

module.exports = router;
